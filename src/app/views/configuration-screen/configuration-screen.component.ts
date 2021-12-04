import {Component, OnInit} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {CenterService} from '../../services/center/center.service';
import {ToastrService} from 'ngx-toastr';
import {Center_dto} from '../../dto/center_dto';

@Component({
  selector: 'app-configuration-screen',
  templateUrl: './configuration-screen.component.html',
  styleUrls: ['./configuration-screen.component.css']
})
export class ConfigurationScreenComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked: boolean = false;
  centers: any;
  centedID: any = 0;
  response: any;

  constructor(private centerService: CenterService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCenters();
  }

  change(event) {
    this.checked = event.checked;
  }

  centerChange() {
    if ('0' !== this.centedID) {
      this.centerService.getCentersById(this.centedID)
        .subscribe(response => {
            this.response = response;
            this.checked = response['paddyLimited'];
          }, () => {
            this.error();
          }
        );
    }
  }

  getAllCenters() {
    this.centerService.getAllActiveCenters()
      .subscribe(response => {
          console.log(response);
          this.centers = response;
        }, () => {
          this.error();
        }
      );
  }

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }

  clear() {
    this.checked = false;
    this.centedID = 0;
  }

  save() {
    if (0 !== this.centedID) {
      const dataDto: Center_dto = {
        registrationId: !this.centedID ? 0 : this.centedID,
        paddyLimited: this.checked,
        name: this.response['name'],
        capacity: this.response['capacity'],
        latitude: this.response['latitude'],
        longitude: this.response['longitude'],
        isActive: 1,
      };
      this.centerService.saveOrUpdate(dataDto)
        .subscribe(response => {
          this.toastr.success('Updated Successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right'
          });
          this.clear();
        }, () => {
          this.error();
        });
    } else {
      this.toastr.error('Please Fill All the Required Fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    }
  }
}
