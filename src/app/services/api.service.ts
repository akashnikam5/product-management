import { Injectable } from '@angular/core';
import { API_BASE_URL, headers } from '../config/app.config';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() {}

  getBaseUrl(): string {
    return API_BASE_URL;
  }

  getHeader(): HttpHeaders {
    return headers;
  }

}