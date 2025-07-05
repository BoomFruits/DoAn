export interface NotificationDTO {
  id: number;
  userId: string;
  title: string;
  message: string;
  bookingId: number;
  isRead: boolean;
  adminRead: boolean;
}