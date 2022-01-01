import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export abstract class ApiService {
  abstract getBaseUrl(): string;

  abstract getHttp(): HttpClient;

  getData(params: HttpParams): Observable<any> {
    const url = this.getBaseUrl();
    const httpOptions = {
      params: params
    };
    return this.getHttp().get(url, httpOptions);
  }

  update(object: any) {
    const url = this.getBaseUrl() + object?.id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.getHttp().put(url, JSON.stringify(object), httpOptions);
  }

  remove(id: string) {
    const url = this.getBaseUrl() + 'remove';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.getHttp().post(url, id, httpOptions);
  }

  getAll() {
    const url = this.getBaseUrl();
    return this.getHttp().get(url);
  }
}
