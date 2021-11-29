import {Component, OnInit} from '@angular/core';
import {Daily_limitService} from '../../services/dily-limit/daily_limit.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  buyingLimit: any;
  sellingLimit: any;

  constructor(private daily_limitService: Daily_limitService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getAllRecordsByDate();
  }

  getAllRecordsByDate() {
    var date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.daily_limitService.getAllRecordsByDate(date)
      .subscribe(response => {
          this.buyingLimit = response[0].buying_limit + 'Kg';
          this.sellingLimit = response[0].selling_limit + 'Kg';
        }, () => {

        }
      );
  }
}
