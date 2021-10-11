import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
const baseUrl = 'https://lecteur-rss.herokuapp.com/api/v1';
@Injectable({
  providedIn: 'root'
})

export class FeedService {

  constructor(private http: HttpClient) {}

  getFeed(){
    return this.http.get(`${baseUrl}/feed`);
  }
  getItems(){
    return this.http.get(`${baseUrl}/items`);
  }

  updateChannel(element){
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(element);
    return this.http.post(`${baseUrl}/channel`, body, {headers} );

  }
  getDataDiff(endDate) {
    const setDate = new Date(endDate).toISOString();
    const diff = (new Date()).getTime() - new Date(setDate).getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const dayString =  days === 0 ?  '' : days + 'jr ';
    const hoursString =  hours === 0 ?  '' : hours + 'h ';
    const minutesString =  minutes === 0 ?  '' : minutes + 'm ';
    return dayString + hoursString + minutesString;
  }
}
