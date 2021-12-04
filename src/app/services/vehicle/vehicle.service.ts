import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {vehicle_dto} from '../../dto/vehicle_dto';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(vehicleDto: vehicle_dto): Observable<any> {
    return this.http.post(BASE_URL + 'vehicles', vehicleDto);
  }

  getAllActive(): Observable<any> {
    return this.http.get(BASE_URL + 'vehicles/all-active');
  }

  getPaddyById(vehicleNo: number) {
    return this.http.get(BASE_URL + 'vehicles/' + vehicleNo);
  }

  deleteVehicle(vehicleNo: number) {
    return this.http.delete(BASE_URL + 'vehicles/' + vehicleNo);
  }


}
