import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {Farmer_dto} from '../../dto/farmer_dto';
import {Daily_limit_dto} from '../../dto/daily_limit_dto';

@Injectable()
export class Daily_limitService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(dailyLimitDTO: Daily_limit_dto): Observable<any> {
    return this.http.post(BASE_URL + 'dailyLimit' , dailyLimitDTO);
  }

  getAllRecords(): Observable<any> {
    return this.http.get(BASE_URL + 'dailyLimit/all');
  }

}
