import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL, httpOptions} from '../../config/config';
import {Order_dto} from '../../dto/order_dto';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) {
  }

  saveOrUpdate(orderDto: Order_dto): Observable<any> {
    return this.http.post(BASE_URL + 'orders', orderDto);
  }

}
