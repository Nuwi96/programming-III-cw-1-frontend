import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../dto/item';
import {PaddyService} from '../../../services/paddy/paddy.service';
import {FarmerService} from '../../../services/farmer/farmer.service';
import {Paddy_dto} from '../../../dto/paddy_dto';
import {ToastrService} from 'ngx-toastr';
import {Daily_limitService} from '../../../services/dily-limit/daily_limit.service';
import {DatePipe} from '@angular/common';

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
  id: number = 0;
  farmerId: number = 0;
  stockedDate: Date = new Date();
  weight: number = 0;
  paidAmount: number = 0;
  buyingPrice: number = 0;

  constructor(private paddyService: PaddyService, private farmerService: FarmerService, private dailyLimitService: Daily_limitService,
              private toastr: ToastrService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getAllFarmer();
    this.getAllRecords();
    this.calculatePaidAmount();
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
    this.paddyService.getPaddyById(this.farmerId)
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
    this.farmerId = 0;
    this.stockedDate = new Date();
    this.weight = 0;
    this.paidAmount = 0;
    this.getAllRecords();
  }

  save() {
    if (0 !== this.farmerId &&
      0 !== this.weight && 0 !== this.paidAmount) {
      const dataDto: Paddy_dto = {
        id: !this.regNo ? 0 : this.regNo,
        farmerId: this.farmerId,
        stockedDate: this.stockedDate,
        weight: this.weight,
        paidAmount: this.paidAmount,

      };
      this.paddyService.saveOrUpdate(dataDto)
        .subscribe(response => {
          if (response.code === 200) {
            this.toastr.success(response.message, '', {
              timeOut: 4000,
              positionClass: 'toast-top-right'
            });
          } else {
            this.toastr.error(response.message, 'Validation Error', {
              timeOut: 10000,
              positionClass: 'toast-top-right'
            });
          }
          this.clear();
          this.getAllRecords();
        }, () => {
          this.error();
        });
    } else {
      this.toastr.error('Please Fill All the Required Fields', '', {
        timeOut: 4000,
        positionClass: 'toast-top-right'
      });
    }
  }

  calculatePaidAmount() {
    var date = this.datePipe.transform(this.stockedDate, 'yyyy-MM-dd');
    this.dailyLimitService.getAllRecordsByDate(date)
      .subscribe(response => {
          this.buyingPrice = response[0].buying_price;
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

  change() {
    if ('0' !== this.farmerId.toString()) {
      this.getRecordsById();
    } else {
      this.getAllRecords();
    }

  }

  onChange(value: any) {
    this.paidAmount = this.buyingPrice * this.weight;
  }

  dateChange($event: any) {
    this.calculatePaidAmount();
  }
}
