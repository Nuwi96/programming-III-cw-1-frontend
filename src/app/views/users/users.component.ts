import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {
  pVbelt: number;
  vbelts: number;

  constructor() { }

  ngOnInit(): void {
  }

}
