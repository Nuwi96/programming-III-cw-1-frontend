import { Component, OnInit } from '@angular/core';
import {FarmerService} from '../../services/farmer/farmer.service';
import {ToastrService} from 'ngx-toastr';
import {vehicle_dto} from '../../dto/vehicle_dto';
import {VehicleService} from '../../services/vehicle/vehicle.service';
import {Farmer_dto} from '../../dto/farmer_dto';

@Component({
  selector: 'app-Vehicle',
  templateUrl: './Vehicle.component.html',
  styleUrls: ['./Vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  pVbelt: number;
  vbelts: number;
  tableData: any;
  vehicleList: Array<vehicle_dto> = [];
  vehicle: any;
  capacity: any;
  availability: boolean;
  constructor(private vehicleService: VehicleService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllVehicles();
  }
  getAllVehicles() {
    this.vehicleService.getAllActive()
      .subscribe(response => {
        console.log(response);
        this.vehicleList = response;
        this.tableData = response;
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

  deleteRecord(id: any) {
    this.vehicleService.deleteVehicle(id)
      .subscribe(response => {
        this.toastr.success('Deleted Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.clear();
        this.getAllVehicles();
      }, () => {
        this.error();
      });
  }

  clear() {
    this.vehicle = '';
    this.capacity = 0;
    this.availability =false;
  }

  getRecord(record: any) {
    console.log('record',record);
    this.vehicle = record.vehicleNo;
    this.capacity = record.maxCapacity;
    this.availability = record.availability;
  }

  save() {
    if (0 !== this.vehicle && 0 !== this.capacity) {
      const dataDto: vehicle_dto = {
        vehicleNo: !this.vehicle ? 0 : this.vehicle,
        maxCapacity: this.capacity,
        availability: this.availability,
      };
      this.vehicleService.saveOrUpdate(dataDto)
        .subscribe(response => {
          this.toastr.success('Updated Successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right'
          });
          this.clear();
          this.getAllVehicles();
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
