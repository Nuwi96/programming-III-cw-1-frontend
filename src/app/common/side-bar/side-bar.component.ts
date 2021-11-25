import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage/token-storage.service";

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
        isShow: this.user.roles.indexOf('ROLE_SUP_ADMIN_P') > -1,
        links: [
          {
            title: 'Manage Users & Permissions',
            isShow: this.user.roles.indexOf('ROLE_SUP_ADMIN_P') > -1,
            iconClass: 'nav-icon fas fa-users-cog',
            url: '/auth/manage-users'
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
      }
    ];

  }

}
