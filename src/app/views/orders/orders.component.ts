import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  vbelts: any;
  pVbelt: 10;

  constructor() { }

  ngOnInit(): void {
    this.vbelts = [{
      "id":'01',
      "name":'Kamal',
      "district":'Matara',
      "aaa":'01',
      "bbb":'01',
    },{
      "id":'02',
      "name":'Kamal',
      "district":'Matara',
      "aaa":'01',
      "bbb":'01',
    },{
      "id":'03',
      "name":'Kamal',
      "district":'Matara',
      "aaa":'01',
      "bbb":'01',
    },{
      "id":'04',
      "name":'Nimal',
      "district":'Matara',
      "aaa":'01',
      "bbb":'01',
    }]
  }
  getRecord(record: any) {
    console.log('record',record);

  }
  deleteRecord(id: any) {
    console.log('del       record', id);

  }
}
