'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zizibot/shadcn/components/ui/card';
import { ScrollArea } from '@zizibot/shadcn/components/ui/scroll-area';
import { Separator } from '@zizibot/shadcn/components/ui/separator';
import { useNotifications } from '@zizibot/ui/provider/notification-provider';
import { Bell, Check, Trash2, X, Loader2, Wifi, WifiOff, Badge } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@zizibot/shadcn/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@zizibot/shadcn/components/ui/popover';

const notificationIcons = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
};

const notificationColors = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
};

export function NotificationCenter() {
  const { notifications, unreadCount, loading, connected, markAsRead, markAllAsRead, removeNotification, clearAll } =
    useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                Notifications
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {connected ? (
                  <Wifi className="h-4 w-4 text-green-500" title="Connected to server" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" title="Disconnected from server" />
                )}
              </CardTitle>
              {notifications.length > 0 && !loading && (
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 px-2 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 px-2 text-xs">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Clear all
                  </Button>
                </div>
              )}
            </div>
            {!loading && notifications.length > 0 && (
              <CardDescription>
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                {!connected && ' • Offline mode'}
              </CardDescription>
            )}
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            {loading ? (
              <div className="p-6 text-center">
                <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                <p className="text-muted-foreground">Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <div className="space-y-1 p-2">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        notification.read ? 'bg-muted/30' : 'bg-background border-primary/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{notificationIcons[notification.type]}</span>
                            <Badge variant="secondary" className={`text-xs ${notificationColors[notification.type]}`}>
                              {notification.type}
                            </Badge>
                            {!notification.read && <div className="h-2 w-2 bg-primary rounded-full" />}
                          </div>
                          <h4 className="text-sm font-medium leading-none">{notification.title}</h4>
                          <p className="text-xs text-muted-foreground">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
