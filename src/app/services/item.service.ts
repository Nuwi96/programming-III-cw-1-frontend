import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../dto/item';
import {BASE_URL} from '../util/utils';
import {Brand} from '../dto/brand';
import {MachineType} from '../dto/machine_type';
import {Needle} from '../dto/needle';
import {Vbelt} from '../dto/vbelt';
import {Foot} from '../dto/foot';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  saveItem(item: Item): Observable<boolean> {
    return this.http.post<boolean>(BASE_URL + 'api/v1/auth/add-item', item);
  }

  saveNeedle(needle: Needle): Observable<boolean> {
    return this.http.post<boolean>(BASE_URL + 'api/v1/auth/add-needle', needle);
  }

  saveVBelt(vbelt: Vbelt): Observable<boolean> {
    return this.http.post<boolean>(BASE_URL + 'api/v1/auth/add-vbelt', vbelt);
  }

  saveFoot(foot: Foot): Observable<boolean> {
    return this.http.post<boolean>(BASE_URL + 'api/v1/auth/add-foot', foot);
  }

  getBrands(): Observable<Array<Brand>> {
    return this.http.get<Array<Brand>>(BASE_URL + 'api/v1/auth/get-brands');
  }

  getMachineTypes(): Observable<Array<MachineType>> {
    return this.http.get<Array<MachineType>>(BASE_URL + 'api/v1/auth/get-machine-types');
  }

  getAllItems(): Observable<Map<string, any>> {
    return this.http.get<Map<string, any>>(BASE_URL + 'api/v1/auth/get-all-items');
  }

}
