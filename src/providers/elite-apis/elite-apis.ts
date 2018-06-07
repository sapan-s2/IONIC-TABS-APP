import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {observable} from "rxjs/symbol/observable";
import 'rxjs/add/operator/map'

@Injectable()
export class EliteApisProvider {

  private baseUrl = "https://elite-schedule-app-f5779.firebaseio.com"
  private currentTourney: any= {};

  constructor(public http: HttpClient) {
    // console.log('Hello EliteApisProvider Provider');
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res))
    })
  }

  getTournamentsData(tourneyId){
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => { this.currentTourney = response
        return this.currentTourney;
      })
  }

  getCurrentTourney() {
    return this.currentTourney;
  }
}
