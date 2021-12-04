import { Component, OnInit } from '@angular/core';
import {Farmer_dto} from '../../dto/farmer_dto';
import {CenterService} from '../../services/center/center.service';
import {ToastrService} from 'ngx-toastr';
import {OrderService} from '../../services/order/order.service';
import {Order_dto} from '../../dto/order_dto';
import {Center_dto} from '../../dto/center_dto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  vbelts: any;
  pVbelt: string | number;
  tableData: any;
  regNo: number = 0;
  vehicleId: number = 0;
  paidAmount: number = 0;
  orderedWeight: number = 0;
  orderedDate: Date = new Date();
  orderType: string = '';
  centerId: number = 0;

  centerList: Array<Center_dto> = [];

  constructor( private orderService: OrderService,private centerService: CenterService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCenters()
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
  clear() {

  }

  save() {
    if (0 !== this.centerId && 0 !== this.vehicleId &&
     0 !== this.paidAmount && 0 !== this.orderedWeight && '' !== this.orderType) {
      const dataDto: Order_dto = {
        id: !this.regNo ? 0 : this.regNo,
        centerId: this.centerId,
        vehicleId: this.vehicleId,
        paidAmount: this.paidAmount,
        orderedWeight: this.orderedWeight,
        orderedDate: this.orderedDate,
        orderType: this.orderType,
      };
      this.orderService.saveOrUpdate(dataDto)
        .subscribe(response => {
          console.log(response);
          if(response.code === 200){
            this.toastr.success('Added Successfully', '', {
              timeOut: 2000,
              positionClass: 'toast-top-right'
            });
            this.clear();
          }else{
            this.toastr.warning(response.message, '', {
              timeOut: 2000,
              positionClass: 'toast-top-right'
            });
          }


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

  error() {
    this.toastr.error('Something Went wrong', '', {
      timeOut: 2000,
      positionClass: 'toast-top-right'
    });
  }
}
