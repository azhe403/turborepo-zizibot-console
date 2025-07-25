import { Notification } from '@zizibot/contracts/dto/notification';

const API_BASE_URL = process.env.API_BASE_URL || 'https://localhost:7001';

export interface CreateNotificationRequest {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  userId?: string;
}

export class NotificationApi {
  static async getNotifications(userId?: string): Promise<Notification[]> {
    const url = new URL(`${API_BASE_URL}/api/notifications`);
    if (userId) {
      url.searchParams.append('userId', userId);
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return data.map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    }));
  }

  static async createNotification(notification: CreateNotificationRequest): Promise<Notification> {
    const response = await fetch(`${API_BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(notification)
    });

    if (!response.ok) {
      throw new Error('Failed to create notification');
    }

    const data = await response.json();
    return {
      ...data,
      timestamp: new Date(data.timestamp)
    };
  }

  static async markAsRead(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${id}/read`, {
      method: 'PUT'
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }
  }

  static async markAllAsRead(userId?: string): Promise<void> {
    const url = new URL(`${API_BASE_URL}/api/notifications/read-all`);
    if (userId) {
      url.searchParams.append('userId', userId);
    }

    const response = await fetch(url.toString(), {
      method: 'PUT'
    });

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }
  }

  static async deleteNotification(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete notification');
    }
  }

  static async clearAll(userId?: string): Promise<void> {
    const url = new URL(`${API_BASE_URL}/api/notifications/clear-all`);
    if (userId) {
      url.searchParams.append('userId', userId);
    }

    const response = await fetch(url.toString(), {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to clear all notifications');
    }
  }
}
