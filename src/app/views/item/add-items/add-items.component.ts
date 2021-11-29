import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../dto/item';
import {PaddyService} from '../../../services/paddy/paddy.service';
import {FarmerService} from '../../../services/farmer/farmer.service';
import {Paddy_dto} from '../../../dto/paddy_dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})


export class AddItemsComponent implements OnInit {

  selectedOption: string = '';
  item: Item = new Item();
  items: any;
  pItem: string | number;
  tableData: any;
  farmers: any[];
  pVbelt: string | number;
  regNo: number = 0;
  id:number = 0;
  farmerId :number = 0;
  stockedDate:Date
  weight:number = 0;
  paidAmount:number = 0;
  constructor(private paddyService: PaddyService,private farmerService: FarmerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllFarmer()
    this.getAllRecords()
  }

  getAllFarmer() {
    this.farmerService.getAllActiveFarmers()
      .subscribe(response => {
        this.farmers = response;
        }, () => {
          this.error();
        }
      );
  }
  getAllRecords() {
    this.paddyService.getAllPaddy()
      .subscribe(response => {
        this.tableData = response;
        }, () => {
          this.error();
        }
      );
  }
  getRecordsById() {
    this.paddyService.getFarmerById(this.farmerId)
      .subscribe(response => {
        this.tableData = [response];
        }, () => {
          this.error();
        }
      );
  }

  getRecord(record: any) {
    this.regNo = record.id;
    this.farmerId = record.farmerId;
    this.stockedDate = record.stockedDate;
    this.weight = record.weight;
    this.paidAmount = record.paidAmount;
  }

  clear() {
    this.regNo = 0;
    this.farmerId =0;
    this.stockedDate = new Date();
    this.weight = 0;
    this.paidAmount = 0;
  }

  save() {
    const dataDto: Paddy_dto = {
      id: !this.regNo ? 0 : this.regNo,
      farmerId: this.farmerId,
      stockedDate: this.stockedDate,
      weight: this.weight,
      paidAmount: this.paidAmount,

    };
    this.paddyService.saveOrUpdate(dataDto)
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

  change() {
    if('0' !== this.farmerId.toString()){
      this.getRecordsById()
    }else {
      this.getAllRecords()
    }

  }
}
