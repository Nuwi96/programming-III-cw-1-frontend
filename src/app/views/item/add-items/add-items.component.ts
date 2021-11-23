import {Component, OnInit, ViewChild} from '@angular/core';
import {Item} from '../../../dto/item';
import {ItemService} from '../../../services/item.service';
import {Brand} from '../../../dto/brand';
import {MachineType} from '../../../dto/machine_type';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';
import {Needle} from '../../../dto/needle';
import {Vbelt} from '../../../dto/vbelt';
import {Foot} from '../../../dto/foot';


@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})


export class AddItemsComponent implements OnInit {

  selectedOption: string;
  item: Item = new Item();
  needle: Needle = new Needle();
  vBelt: Vbelt = new Vbelt();
  foot: Foot = new Foot();
  brands: Array<Brand> = [];
  machineTypes: Array<MachineType> = [];
  selectedBrand: Brand = new Brand();
  selectedMachineType: MachineType = new MachineType();
  @ViewChild('frmItems') frmCustomers: NgForm;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.selectedOption = '';
    this.getInitialData();
  }

  saveItem(): void {
    this.item.brand = this.selectedBrand;
    this.item.machineType = this.selectedMachineType;

    this.itemService.saveItem(this.item).subscribe(value => {
      if (value) {
        Swal.fire(
          'Successful!',
          'Item Added Successfully!',
          'success'
        ).then(value1 => {
          this.clear();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }

  saveNeedle(): void {
    this.needle.brand = this.selectedBrand;

    this.itemService.saveNeedle(this.needle).subscribe(value => {
      if (value) {
        Swal.fire(
          'Successful!',
          'Item Added Successfully!',
          'success'
        ).then(value1 => {
          this.clear();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }

  saveVBelt(): void {

    this.itemService.saveVBelt(this.vBelt).subscribe(value => {
      if (value) {
        Swal.fire(
          'Successful!',
          'Item Added Successfully!',
          'success'
        ).then(value1 => {
          this.clear();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }

  saveFoot(): void {
    this.itemService.saveFoot(this.foot).subscribe(value => {
      if (value) {
        Swal.fire(
          'Successful!',
          'Item Added Successfully!',
          'success'
        ).then(value1 => {
          this.clear();
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }

  getInitialData(): void {

    this.itemService.getBrands().subscribe(value => {
      this.brands = value;
    });

    this.itemService.getMachineTypes().subscribe(value => {
      this.machineTypes = value;
    });

  }

  clear(): void {
    this.item = new Item();
    this.selectedBrand = new Brand();
    this.selectedMachineType = new MachineType();
  }

  log(): void {
    console.log(this.selectedBrand);
    console.log(this.selectedMachineType);
  }

}
