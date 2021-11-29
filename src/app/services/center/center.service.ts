import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {Center_dto} from '../../dto/center_dto';

@Injectable()
export class CenterService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(centerDto: Center_dto): Observable<any> {
    return this.http.post(BASE_URL + 'centers' , centerDto);
  }

  getAllActiveCenters(): Observable<any> {
    return this.http.get(BASE_URL + 'centers/all-active');
  }

  getAllInActiveCenters(): Observable<any> {
    return this.http.get(BASE_URL + 'centers/all-inactive');
  }

  getCentersById(registrationId: number) {
    return this.http.get(BASE_URL + 'centers/' + registrationId);
  }

  deleteById(registrationId: number) {
    return this.http.delete(BASE_URL + 'centers/' + registrationId);
  }

}
