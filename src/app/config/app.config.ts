import { HttpHeaders } from "@angular/common/http";

export const API_BASE_URL = 'http://206.189.13.18/api/v1/';

export const headers = new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Add any additional headers here
  });