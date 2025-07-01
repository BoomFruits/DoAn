import { CommonModule, DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ChartData, ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  HeaderComponent,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { ChartjsComponent, ChartjsModule } from '@coreui/angular-chartjs';
import { DashboardService } from '../../../services/dashboard.service';
import { DashboardStats } from '../../../../model/DashboardStats.model';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    standalone:true,
    imports: [ChartjsModule,CardComponent,CardBodyComponent,FormsModule,
  CardHeaderComponent,CommonModule]
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardService: DashboardService){}
  dashboardStats: DashboardStats | undefined;
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  statMode: 'today' | 'month' | 'custom' = 'today';
  fromDate!: string;
  toDate!: string;
successCount = 0;
canceledCount = 0;
  totalRevenue = 0;
totalBookings = 0;
userCount = 0;
activeRooms = 0;
todayCheckins = 0;
todayCheckouts = 0;
topServicesChartData!: ChartData<'bar'>;
topRoomsChartData!: ChartData<'bar'>;
monthlyRevenueChartData!: ChartData<'line'>;
monthlyBookingsChartData!: ChartData<'bar'>;
chartBarData: ChartData<'bar'> = {
  labels: ['Total booking', 'Room active', 'Checkin today', 'Checkout today','Today booking','MonthBookings'],
  datasets: [
    {
      label: 'Thống kê tổng quan',
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350','#c25640','#a12283'],
      data: []
    }
  ]
};

options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
  setStatMode(mode: 'today' | 'month' | 'custom') {
    this.statMode = mode;
    if (mode !== 'custom') this.loadDashboard();
  }
    loadDashboard() {
    const params: any = { mode: this.statMode };
    if (this.statMode === 'custom') {
      if (!this.fromDate || !this.toDate) {
        alert('Vui lòng chọn khoảng ngày!');
        return;
      }
      params.from = this.fromDate;
      params.to = this.toDate;
    }

    this.dashboardService.getStats(params).subscribe((res: DashboardStats) => {
      this.totalBookings = res.totalBookings;
      this.successCount = res.successCount;
      this.canceledCount = res.canceledCount;
      this.activeRooms = res.activeRooms;
      this.todayCheckins = res.todayCheckins;
      this.todayCheckouts = res.todayCheckouts;

      // Bar chart tổng quan
      this.chartBarData = {
        labels: ['Tổng đặt phòng', 'Phòng hoạt động', 'Checkin hôm nay', 'Checkout hôm nay'],
        datasets: [{
          label: 'Tổng quan',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350'],
          data: [this.totalBookings, this.activeRooms, this.todayCheckins, this.todayCheckouts]
        }]
      };

      // Top dịch vụ
      this.topServicesChartData = {
        labels: res.topServices.map(s => s.serviceName),
        datasets: [{
          label: 'Dịch vụ phổ biến',
          backgroundColor: '#42A5F5',
          data: res.topServices.map(s => s.totalUsed)
        }]
      };

      // Top phòng
      this.topRoomsChartData = {
        labels: res.topRooms.map(r => r.roomNo),
        datasets: [{
          label: 'Lượt đặt phòng',
          backgroundColor: '#66BB6A',
          data: res.topRooms.map(r => r.count)
        }]
      };

      // Monthly revenue
      const revenueByMonth = Array(12).fill(0);
      res.monthlyRevenue.forEach(m => revenueByMonth[m.month - 1] = m.revenue);
      this.monthlyRevenueChartData = {
        labels: this.months,
        datasets: [{
          label: 'Doanh thu',
          data: revenueByMonth,
          borderColor: '#EF5350',
          backgroundColor: 'rgba(239,83,80,0.2)',
          fill: true
        }]
      };

      // Monthly bookings
      const bookingsByMonth = Array(12).fill(0);
      res.monthlyBookings.forEach(m => bookingsByMonth[m.month - 1] = m.count);
      this.monthlyBookingsChartData = {
        labels: this.months,
        datasets: [{
          label: 'Lượt đặt',
          backgroundColor: '#FFA726',
          data: bookingsByMonth
        }]
      };
    });
  }
ngOnInit() {
  this.loadDashboard();
}
}
