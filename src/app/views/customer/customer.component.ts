import {Component, OnInit} from '@angular/core';
import {FarmerService} from '../../services/farmer/farmer.service';
import {Farmer_dto} from '../../dto/farmer_dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  pVbelt: number;
  tableData: any;
  regNo: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  farmerAge: number = 0;
  address: string = '';
  centers: number = 0;

  constructor(private farmerService: FarmerService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllFarmer();
  }

  getAllFarmer() {
    this.farmerService.getAllActiveFarmers()
      .subscribe(response => {
          this.tableData = response;
        }, () => {
          this.error();
        }
      );
  }

  getRecord(record: any) {
    this.regNo = record.registrationNo;
    this.firstName = record.firstName;
    this.middleName = record.middleName;
    this.lastName = record.lastName;
    this.farmerAge = record.age;
    this.address = record.address;
    this.centers = record.centerId;
  }

  deleteRecord(id: any) {
    this.clear();
    this.farmerService.deleteById(id)
      .subscribe(response => {
        this.toastr.success('Deleted Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.getAllFarmer();
      }, () => {
        this.error();
      });
    console.log('del record', id);
  }

  clear() {
    this.regNo = 0;
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.farmerAge = 0;
    this.address = '';
    this.centers = 0;
  }

  save() {
    const dataDto: Farmer_dto = {
      registrationNo: !this.regNo ? 0 : this.regNo,
      centerId: this.centers,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      address: this.address,
      age: this.farmerAge,
      isActive: 1,
    };
    this.farmerService.saveOrUpdate(dataDto)
      .subscribe(response => {
        this.toastr.success('Updated Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.clear();
        this.getAllFarmer();
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
