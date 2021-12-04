import {Component, OnInit} from '@angular/core';
import {Daily_limitService} from '../../services/dily-limit/daily_limit.service';
import {Daily_limit_dto} from '../../dto/daily_limit_dto';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-daily-limits',
  templateUrl: './daily-limits.component.html',
  styleUrls: ['./daily-limits.component.css']
})
export class DailyLimitsComponent implements OnInit {

  sellingLimit: number = 0;
  buyingLimit: number = 0;
  sellingPrice: number = 0;
  buyingPrice: number = 0;

  date: Date = new Date();
  tableData: any[] = [];
  pVbelt: string | number = 1;
  pipe = new DatePipe('en-US');
  now = Date.now();

  constructor(private daily_limitService: Daily_limitService, private toastr: ToastrService, private datePipe: DatePipe) {

  }

  ngOnInit(): void {
    this.getAllRecordsByDate();
  }

  getAllRecordsByDate() {
    var date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
    this.daily_limitService.getAllRecordsByDate(date)
      .subscribe(response => {
          this.tableData = response;
        }, () => {

        }
      );
  }

  save() {
    if (0 === this.buyingLimit || 0 === this.sellingLimit) {
      this.toastr.error('Please fill all the fields', '', {
        timeOut: 2000,
        positionClass: 'toast-top-right'
      });
    } else {
      const dataDto: Daily_limit_dto = {
        id: 0,
        buying_limit: this.buyingLimit,
        selling_limit: this.sellingLimit,
        date: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
        buying_price: this.buyingPrice,
        selling_price: this.sellingPrice,

      };
      this.daily_limitService.saveOrUpdate(dataDto)
        .subscribe(response => {
          this.toastr.success('Limit Added Successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-right'
          });
          this.getAllRecordsByDate();
          this.clear();
        }, () => {
          this.error();
        });

    }

  }

  clear() {
    this.sellingLimit = 0;
    this.buyingLimit = 0;
    this.date = new Date();
    this.sellingPrice = 0;
    this.buyingPrice = 0;
    this.getAllRecordsByDate();
  }

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 10000,
      positionClass: 'toast-top-right'
    });
  }

  getRecord(data: any) {
    this.sellingLimit = data.selling_limit;
    this.buyingLimit = data.buying_limit;
    this.sellingPrice = data.selling_price;
    this.buyingPrice = data.buying_price;
  }

  change(event) {
    this.date = event.value;
    this.getAllRecordsByDate();
  }
}
