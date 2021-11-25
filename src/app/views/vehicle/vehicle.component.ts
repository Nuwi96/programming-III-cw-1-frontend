import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Vehicle',
  templateUrl: './Vehicle.component.html',
  styleUrls: ['./Vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  pVbelt: number;
  vbelts: number;

  constructor() { }

  ngOnInit(): void {
  }

}
