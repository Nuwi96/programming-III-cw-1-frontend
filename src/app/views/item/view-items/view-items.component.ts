import { Component, OnInit } from '@angular/core';
import {ItemService} from '../../../services/item.service';
import {Item} from '../../../dto/item';
import {Needle} from '../../../dto/needle';
import {Vbelt} from '../../../dto/vbelt';
import {Foot} from '../../../dto/foot';

@Component({
  selector: 'app-view-items',
  templateUrl: './view-items.component.html',
  styleUrls: ['./view-items.component.css']
})
export class ViewItemsComponent implements OnInit {

  allItems: Map<string, any> = new Map<string, object>();
  items: Array<Item> = [];
  needles: Array<Needle> = [];
  vbelts: Array<Vbelt> = [];
  foots: Array<Foot> = [];
  pItem: number = 1;
  pVbelt: number = 1;
  pFoot: number = 1;
  pNeedle: number = 1;
  yourModelDate: Date =new Date();

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.itemService.getAllItems().subscribe(
      value => {
          this.allItems = value;
      },
      error => {},
      () => {
        this.items = this.allItems['items'];
        this.needles = this.allItems['needles'];
        this.vbelts = this.allItems['vbelts'];
        this.foots = this.allItems['foots'];
      }
    );
  }

}
