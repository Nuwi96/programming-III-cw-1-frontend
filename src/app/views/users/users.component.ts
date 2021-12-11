import { Component, OnInit } from '@angular/core';
import {CenterService} from '../../services/center/center.service';
import {Center_dto} from '../../dto/center_dto';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../dto/user';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  role = '';
  centers: Array<Center_dto> = [];
  users: Array<User> = [];
  selectedCenter: Center_dto = null;

  userName: any;
  email: any;
  pUser: number;

  constructor(private centerService: CenterService, private toaster: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadAllUsers();
    this.loadActiveCenters();
  }

  loadActiveCenters(): void {
    this.centerService.getAllActiveCenters().subscribe(response => {
      this.centers = response;
    }, error => {
      console.log(error);
    });
  }

  loadAllUsers(): void {
    this.users = [];
    this.authService.loadAllUsers().subscribe(resp => {
      console.log(resp);
      this.users = resp;
    }, error => {
      console.log(error);
    });
  }

  convertRoles(roles): string {
    const roleRet = [];
    roles.map(role => {
      roleRet.push(role.name);
    });
    return roleRet.toString();
  }

  save(): void {
    console.log(this.selectedCenter);
    if ('' !== this.userName && '' !== this.email && '' !== this.role) {
      const user = {
        username: this.userName,
        email: this.email,
        role: [this.role, 'user'],
        password: '123456',
        registrationId : this.selectedCenter !== null ? this.selectedCenter : 0
      };

      this.authService.register(user).subscribe(value => {
        this.toaster.success('User Added Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.loadAllUsers();
      }, error => {
        console.log(error);
        this.toaster.error(error.error.message, '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
      });

    } else {
      this.toaster.error('Please Fill All the Required Fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    }
  }

}
