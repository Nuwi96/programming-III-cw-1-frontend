import {Component, OnInit} from '@angular/core';
import {FarmerService} from '../../services/farmer/farmer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  pVbelt: number;
  tableData: any;
  regNo: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  farmerAge: number = 0;
  address: string = '';

  constructor(private farmerService: FarmerService) {
  }

  ngOnInit(): void {
    this.getAllFarmer();
  }

  getAllFarmer() {
    console.log('getAllFarmer');
    this.farmerService.getAllActiveFarmers()
      .subscribe(response => {
          this.tableData = response;
          console.log(response);
        }, () => {

        }
      );
  }

  getRecord(record: any) {
    console.log('record', record);
    this.regNo = record.registrationNo;
    this.firstName = record.firstName;
    this.middleName = record.middleName;
    this.lastName = record.lastName;
    this.farmerAge = record.age;
    this.address = record.address;
  }

  deleteRecord(id: any) {
    console.log('del       record', id);
  }

  clear() {
    this.regNo = '';
    this.firstName = '';
    this.middleName = '';
    this.lastName = '';
    this.farmerAge = 0;
    this.address = '';
  }
}
