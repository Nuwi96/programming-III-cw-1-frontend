import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {
  pVbelt: number;
  vbelts: any;

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
