import Config from '../config';

const getBaseUrl = () => {
  return Config.API_BASE_URL;
};

export const getNotifications = async (userId: number) => {
  const response = await fetch(
    `${getBaseUrl()}/notifications?userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }

  return response.json();
};

export const getUnreadCount = async (userId: number) => {
  const response = await fetch(
    `${getBaseUrl()}/notifications/unread-count?userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch unread notification count');
  }

  return response.json();
};

export const markNotificationAsRead = async (
  notificationId: number,
  userId: number,
) => {
  const response = await fetch(
    `${getBaseUrl()}/notifications/${notificationId}/read`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to mark notification as read');
  }

  return response.json();
};

export const markAllNotificationsAsRead = async (userId: number) => {
  const response = await fetch(
    `${getBaseUrl()}/notifications/read-all`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
      }),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to mark all notifications as read');
  }

  return response.json();
};