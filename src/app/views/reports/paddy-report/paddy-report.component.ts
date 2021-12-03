import {Component, OnInit, ViewChild} from '@angular/core';
import {PaddyService} from '../../../services/paddy/paddy.service';
import {ToastrService} from 'ngx-toastr';
import {Center_dto} from '../../../dto/center_dto';
import {CenterService} from '../../../services/center/center.service';
import {FarmerService} from '../../../services/farmer/farmer.service';
import {Farmer_dto} from '../../../dto/farmer_dto';
import {PaddyReportDto} from '../../../dto/paddy-report-dto';
import {Label, SingleDataSet} from 'ng2-charts';

@Component({
  selector: 'app-paddy-report',
  templateUrl: './paddy-report.component.html',
  styleUrls: ['./paddy-report.component.css']
})
export class PaddyReportComponent implements OnInit {

  pVbelt: number;
  tableData: any;

  date: Date = new Date();
  fromDate: Date = new Date(this.date.getFullYear(), 0, 1);
  toDate: Date = new Date();

  centerList: Array<Center_dto> = [];
  farmerList: Array<Farmer_dto> = [];

  paddyReportList: Array<PaddyReportDto> = [];

  selectedCenterId = 0;
  selectedFarmerId = 0;

  // PolarArea
  public chartLabels: Label[] = [];
  public chartData: SingleDataSet = [];
  public chartLegend = true;

  constructor(private paddyService: PaddyService, private centerService: CenterService,
              private farmerService: FarmerService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAllCenters();
  }

  getAllCenters() {
    this.centerService.getAllActiveCenters()
      .subscribe(response => {
          this.centerList = response;
        }, () => {
          this.error();
        }
      );
  }

  getFarmersByCenterId() {

    this.farmerService.getFarmersByCenterId(this.selectedCenterId)
      .subscribe(response => {
          this.farmerList = response;
        }, () => {
          this.error();
        }
      );
  }

  getPaddyReportData() {

    this.paddyReportList = [];
    this.chartLabels = [];
    this.chartData = [];

    const nuFromMonth = Number(this.fromDate.getMonth()) + 1;
    const nuToMonth = Number(this.toDate.getMonth()) + 1;

    const fromMonth = nuFromMonth.toString().length === 1 ? '0' + nuFromMonth : nuFromMonth;
    const fromDay = this.fromDate.getDate().toString().length === 1 ? '0' + this.fromDate.getDate() : this.fromDate.getDate();

    const toMonth = nuToMonth.toString().length === 1 ? '0' + nuToMonth : nuToMonth;
    const toDay = this.toDate.getDate().toString().length === 1 ? '0' + this.toDate.getDate() : this.toDate.getDate();

    const strFromDate = this.fromDate.getFullYear() + '-' + fromMonth + '-' + fromDay + ' 00:00';
    const strToDate = this.toDate.getFullYear() + '-' + toMonth + '-' + toDay + ' 23:59';

    this.paddyService.getPaddyReportData(strFromDate, strToDate, this.selectedCenterId, this.selectedFarmerId)
      .subscribe(response => {
          this.paddyReportList = response;

          this.tableData = this.paddyReportList;

          if (this.paddyReportList !== null) {
            for (const paddyReport of this.paddyReportList) {
              this.chartLabels.push(paddyReport.farmerName);
              this.chartData.push(paddyReport.totalWeight);
            }
          }

        }, () => {
          this.error();
        }
      );
  }

  fromDateChange(event) {
    this.fromDate = event.value;
  }

  toDateChange(event) {
    this.toDate = event.value;
  }

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }
}
