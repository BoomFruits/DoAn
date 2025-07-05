export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  totalBookings: number;
  todayBookings: number;
  userCount: number;
  activeRooms: number;
  todayCheckins: number;
  todayCheckouts: number;
  monthCheckins: number;
  monthCheckouts: number;
canceledCount:number;
successCount: number;
  topRooms: {
    roomId: number;
    count: number;
    roomNo: string;
  }[];

  topServices: {
    serviceName: string;
    totalUsed: number;
  }[];

  monthlyRevenue: {
    month: number;
    revenue: number;
  }[];

  monthlyBookings: {
    month: number;
    count: number;
  }[];
}
