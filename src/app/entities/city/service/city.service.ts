import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICity} from "../city.model";
import {ApiService} from "../../../core/utils/services/services";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiService {

  private baseUrl = environment.serverUrl + '/api/cities/';

  constructor(private http: HttpClient) {
    super();
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getHttp() {
    return this.http;
  }

  getCity(id: number) {
    const url = this.baseUrl + id;
    return this.http.get(url);
  }
}
