'use client';

import { NotificationContextType } from '@zizibot/contracts/dto/notification';
import { NotificationApi } from '@zizibot/rest-client/internal/notification-rest';
import { signalRService } from '@zizibot/rest-client/utils/signalr';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
  userId?: string;
}

export function NotificationProvider({ children, userId }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeConnection = async () => {
      try {
        // Load initial notifications
        const initialNotifications = await NotificationApi.getNotifications(userId);
        if (mounted) {
          setNotifications(initialNotifications);
          setLoading(false);
        }

        // Connect to SignalR
        const connection = await signalRService.connect(userId);
        if (mounted) {
          setConnected(true);
        }

        // Listen for new notifications
        connection.on('ReceiveNotification', (notification: any) => {
          if (mounted) {
            const newNotification: Notification = {
              ...notification,
              timestamp: new Date(notification.timestamp)
            };

            setNotifications((prev) => [newNotification, ...prev]);

            // Show toast notification
            toast(notification.title, {
              description: notification.message,
              duration: 5000
            });
          }
        });

        // Listen for notification updates
        connection.on('NotificationUpdated', (notification: any) => {
          if (mounted) {
            const updatedNotification: Notification = {
              ...notification,
              timestamp: new Date(notification.timestamp)
            };

            setNotifications((prev) => prev.map((n) => (n.id === updatedNotification.id ? updatedNotification : n)));
          }
        });

        // Listen for notification deletions
        connection.on('NotificationDeleted', (notificationId: string) => {
          if (mounted) {
            setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
          }
        });

        // Listen for bulk operations
        connection.on('NotificationsCleared', (clearedUserId?: string) => {
          if (mounted && (!userId || clearedUserId === userId)) {
            setNotifications([]);
          }
        });

        connection.on('AllNotificationsMarkedAsRead', (markedUserId?: string) => {
          if (mounted && (!userId || markedUserId === userId)) {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }
        });
      } catch (error) {
        console.error('Failed to initialize notification system:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeConnection();

    return () => {
      mounted = false;
      signalRService.disconnect();
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    try {
      await NotificationApi.markAsRead(id);
      // The SignalR hub will broadcast the update
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await NotificationApi.markAllAsRead(userId);
      // The SignalR hub will broadcast the update
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast.error('Failed to mark all notifications as read');
    }
  };

  const removeNotification = async (id: string) => {
    try {
      await NotificationApi.deleteNotification(id);
      // The SignalR hub will broadcast the update
    } catch (error) {
      console.error('Error removing notification:', error);
      toast.error('Failed to remove notification');
    }
  };

  const clearAll = async () => {
    try {
      await NotificationApi.clearAll(userId);
      // The SignalR hub will broadcast the update
    } catch (error) {
      console.error('Error clearing all notifications:', error);
      toast.error('Failed to clear all notifications');
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        loading,
        connected,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
