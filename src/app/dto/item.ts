import {Brand} from './brand';
import {MachineType} from './machine_type';

export class Item {

  id: number;
  serialNo: number;
  brand: Brand;
  machineType: MachineType;
  model: string;
  description: string;
  partNumber: string;
  qtyOnHand: number;
  billingPrice: number;
  sellingPrice: number;

}
