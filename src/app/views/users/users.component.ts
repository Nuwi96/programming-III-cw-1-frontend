import { Component, OnInit } from '@angular/core';
import {CenterService} from '../../services/center/center.service';
import {Center_dto} from '../../dto/center_dto';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  role = '';
  centers: Array<Center_dto> = [];
  selectedCenter: Center_dto = null;

  userName: any;
  email: any;

  constructor(private centerService: CenterService, private toaster: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadActiveCenters();
  }

  loadActiveCenters(): void {
    this.centerService.getAllActiveCenters().subscribe(response => {
      this.centers = response;
    }, error => {
      console.log(error);
    });
  }

  save(): void {
    if ('' !== this.userName && '' !== this.email && '' !== this.role) {
      const user = {
        username: this.userName,
        email: this.email,
        role: [this.role, 'user'],
        password: '123456',
        registrationId : this.selectedCenter !== null ? this.selectedCenter.registrationId : 0
      };

      this.authService.register(user).subscribe(value => {
        this.toaster.success('User Added Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        console.log(value);
      }, error => {
        console.log(error);
        this.toaster.error('Something Went wrong', '', {
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
