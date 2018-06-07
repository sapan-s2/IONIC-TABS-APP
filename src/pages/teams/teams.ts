import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamHomePage} from "../team-home/team-home";
import {EliteApisProvider} from "../../providers/elite-apis/elite-apis";
import * as _ from 'lodash';
import {iterateListLike} from "@angular/core/src/change_detection/change_detection_util";

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

 public teams = [
    // {id:1, name: 'HC Elite' },
    // {id:2, name: 'Team Takeover' },
    // {id:3, name: 'DC Thunder' }

  ];

 private allTeams: any;
 private allTeamDivisions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams , private elitAPIs : EliteApisProvider,private loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader  =this.loadingController.create({
      content: 'Getting Started...'
    })

    loader.present().then(() =>  { this.elitAPIs.getTournamentsData(selectedTourney.id)
      .subscribe(
        data => {
          this.allTeams = data.teams;
          this.allTeamDivisions =
            _.chain(data.teams)
              .groupBy('division')
              .toPairs()
              .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
              .value();
          this.teams = this.allTeamDivisions;
          console.log('divisions teams: '+ this.teams);
        loader.dismiss();
        }
      );})



  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage,team)
  }

}
