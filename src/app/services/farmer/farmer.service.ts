import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {Farmer_dto} from '../../dto/farmer_dto';

@Injectable()
export class FarmerService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(farmerDTO: Farmer_dto): Observable<any> {
    return this.http.post(BASE_URL + '', farmerDTO);
  }

  getAllActiveFarmers(): Observable<any> {
    return this.http.get(BASE_URL + 'farmers/all-active');
  }

  getAllInActiveFarmers(): Observable<any> {
    return this.http.get(BASE_URL + 'farmers/all-inactive');
  }
  // getFarmerById(registrationNo:number){
  //   return this.http.get(BASE_URL + 'farmers/${registrationNo}');
  // }

}
