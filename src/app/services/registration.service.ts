
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  registerUser(userData: any): Observable<any> {
    const url = this.apiService.getBaseUrl() + 'user/index.php';
    return this.http.post(url, userData, { responseType: 'text' });
  }
}
