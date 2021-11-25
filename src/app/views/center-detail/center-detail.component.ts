import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.css']
})
export class CenterDetailComponent implements OnInit {
  vbelts: any;
  pVbelt: string | number;

  constructor() { }

  ngOnInit(): void {
  }

}
