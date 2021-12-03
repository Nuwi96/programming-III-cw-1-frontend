import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {Paddy_dto} from '../../dto/paddy_dto';

@Injectable()
export class PaddyService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(paddyDto: Paddy_dto): Observable<any> {
    return this.http.post(BASE_URL + 'paddy', paddyDto);
  }

  getAllPaddy(): Observable<any> {
    return this.http.get(BASE_URL + 'paddy/all');
  }

  getPaddyById(id: number) {
    return this.http.get(BASE_URL + 'paddy/' + id);
  }

  getPaddyReportData(fromDate: string, toDate: string, centerId: number, farmerId: number): Observable<any> {
    return this.http.get(BASE_URL + 'paddy/paddy-report/' + fromDate + '/' + toDate + '/' + centerId + '/' + farmerId);
  }

}
