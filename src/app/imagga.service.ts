import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ImaggaService {
  api_key:string = 'acc_0dc865c987f824f'
  api_secret :string= 'b2262aa820e717705682d13a8a608323'
  imagePath: string="https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg"
  baseUrl:string = 'https://api.imagga.com/v2'
  headerz = new HttpHeaders({
    'Authorization': 'Basic ' + btoa(this.api_key + ':' + this.api_secret),
    'Content-Type': 'application/json', // Adding the Content-Type header
    // 'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  });

  constructor(private router:Router, private http:HttpClient) { }

  getTags() {
    const image_Url=this.imagePath;
    const headers=this.headerz;
  
    this.http.get(`${this.baseUrl}/tags`, {headers, params: { image_url: image_Url }}).subscribe(
      data => {
        console.log(data);
     });
  
  }

  postTags(imageBase64: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

    const body = JSON.stringify({
      "image_base64": imageBase64
    });

    // Return the promise after converting the observable to promise
    return this.http.post('https://atisam12121.pythonanywhere.com/tags', body, { headers }).toPromise();
   
  }
  getface(imageBase64: string,image:File): Promise<any> {
    const headers = new HttpHeaders({
      'Accept': '*/*'
    });
    const formData = new FormData();
    // Append the base64-encoded image as a field
    formData.append('image_base64', imageBase64);
    // Append the image file to the FormData object
    formData.append('image', image);
    // Return the promise after converting the observable to promise
    return this.http.post('https://atisam12121.pythonanywhere.com/face', formData, { headers }).toPromise();
  
  }


  

  }



