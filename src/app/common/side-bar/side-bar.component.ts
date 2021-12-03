import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage/token-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  user: any = {};
  routes: any = [];

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.routes = [
      {
        header: null,
        isShow: true,
        links: [
          {
            title: 'Dashboard',
            isShow: true,
            iconClass: 'nav-icon fas fa-tachometer-alt',
            url: '/admin/dashboard'
          },
        ]
      },
      {
        header: 'USER MANAGEMENT',
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Manage Users',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-users-cog',
            url: '/admin/users'
          }
        ]
      },
      {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Orders',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/orders'
          }
        ]
      },
      {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Farmers',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/customers'
          }
        ]
      }, {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Paddy collection',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fa-sitemap fas',
            url: '/admin/paddy/add-item',
          }
        ]
      }, {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Centers',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/center-details'
          }
        ]
      }, {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Configuration Screen',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/configuration-screen'
          }
        ]
      }, {
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Daily Limit',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/daily-limit'
          }
        ]
      },{
        header: null,
        isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
        links: [
          {
            title: 'Paddy Report',
            isShow: this.user.roles.indexOf('ROLE_HEAD_OFFICE_MANAGER') > -1,
            iconClass: 'nav-icon fas fa-chart-pie',
            url: '/admin/reports/paddy-report'
          }
        ]
      }
    ];

  }

}
