import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-management',
  templateUrl: './price-management.component.html',
  styleUrls: ['./price-management.css']
})
export class PriceManagementComponent implements OnInit {
  item: any;

  constructor() { }

  ngOnInit(): void {
  }

}
