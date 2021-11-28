import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Daily_limitService} from '../../services/dily-limit/daily_limit.service';
import {Daily_limit_dto} from '../../dto/daily_limit_dto';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-daily-limits',
  templateUrl: './daily-limits.component.html',
  styleUrls: ['./daily-limits.component.css']
})
export class DailyLimitsComponent implements OnInit {

  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  sellingLimit: number;
  buyingLimit: number;
  date: Date = new Date();

  constructor(private daily_limitService: Daily_limitService, private toastr: ToastrService) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16)),
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date(year, month, 15)),
      end: new FormControl(new Date(year, month, 19)),
    });
  }

  ngOnInit(): void {
    this.getAllRecords();
  }

  getAllRecords() {
    this.daily_limitService.getAllRecords()
      .subscribe(response => {
          console.log(response);
        }, () => {

        }
      );
  }

  save() {
    const dataDto: Daily_limit_dto = {
      id: 0,
      buying_limit: this.buyingLimit,
      selling_limit: this.sellingLimit,
      date: this.date,
    };
    console.log(dataDto);
    this.daily_limitService.saveOrUpdate(dataDto)
      .subscribe(response => {
        this.toastr.success('Limit Added Successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-right'
        });
        this.clear();
      }, () => {
        this.error();
      });

  }

  clear() {
    this.sellingLimit = 0;
    this.buyingLimit = 0;
    this.date = new Date();
  }

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }
}
