import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-configuration-screen',
  templateUrl: './configuration-screen.component.html',
  styleUrls: ['./configuration-screen.component.css']
})
export class ConfigurationScreenComponent implements OnInit {
  color: ThemePalette = 'accent';
  checked = false;
  constructor() { }

  ngOnInit(): void {
  }

  change(event) {
    console.log(event.checked);
  }

  centerChange($event: Event) {
    this.checked = false
  }
}
