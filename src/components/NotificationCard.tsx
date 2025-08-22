import React from 'react';
import { Bell, Calendar, Users, MessageCircle, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'event' | 'club' | 'message';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDismiss: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ 
  notification, 
  onMarkAsRead, 
  onDismiss 
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'event':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      case 'club':
        return <Users className="w-5 h-5 text-green-600" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-purple-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className={`p-4 rounded-lg border transition-colors ${
      notification.isRead 
        ? 'bg-white border-gray-200' 
        : 'bg-blue-50 border-blue-200'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="mt-1">{getIcon()}</div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{notification.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {!notification.isRead && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Mark as read
            </button>
          )}
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
