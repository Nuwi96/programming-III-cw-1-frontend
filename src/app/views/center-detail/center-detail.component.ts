import {Component, OnInit} from '@angular/core';
import {Center_dto} from '../../dto/center_dto';
import {ToastrService} from 'ngx-toastr';
import {CenterService} from '../../services/center/center.service';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.css']
})
export class CenterDetailComponent implements OnInit {
  vbelts: any;
  pVbelt: string | number;
  name: any;
  capacity: any;
  latitude: any;
  longitude: any;
  regNo: number;
  tableData: any[];

  constructor(private centerService: CenterService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCenters();
  }

  clear() {
    this.regNo = 0;
    this.name = '';
    this.capacity = '';
    this.latitude = '';
    this.longitude = '';
  }

  save() {
    if ('' !== this.name &&
      0 !== this.capacity && 0 !== this.latitude && 0 !== this.longitude) {
      const dataDto: Center_dto = {
        registrationId: !this.regNo ? 0 : this.regNo,
        paddyLimited: false,
        name: this.name,
        capacity: this.capacity,
        latitude: this.latitude,
        longitude: this.longitude,
        isActive: 1,
      };
      this.centerService.saveOrUpdate(dataDto)
        .subscribe(response => {
          this.toastr.success('Updated Successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right'
          });
          this.clear();
          this.getAllCenters();
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


  getAllCenters() {
    this.centerService.getAllActiveCenters()
      .subscribe(response => {
          this.tableData = response;
        }, () => {
          this.error();
        }
      );
  }

  getRecord(record: any) {
    console.log(record);
    this.regNo = record.registrationId;
    this.name = record.name;
    this.capacity = record.capacity;
    this.latitude = record.latitude;
    this.longitude = record.longitude;
  }

  deleteRecord(id: any) {

    this.centerService.deleteById(id)
      .subscribe(response => {
        this.toastr.success('Deleted Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.getAllCenters();
        this.clear();
      }, () => {
        this.error();
      });
  }

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }
}
