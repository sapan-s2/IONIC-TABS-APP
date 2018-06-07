import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TournamentsPage} from "../tournaments/tournaments";
import {EliteApisProvider} from "../../providers/elite-apis/elite-apis";
import {TeamHomePage} from "../team-home/team-home";

/**
 * Generated class for the MyTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {
  favorites
    = [
    {
      team: {id:6182, name: "HC Elite 7th", coach:"Michelotti"},
      tournamentId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
      tournamentName: "March Madness Tournament"
    },

    {
      team: {id:805, name: "Maryland 3D", coach:"Michelotti"},
      tournamentId: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
      tournamentName: "Holiday Hoops Challenge"
    }
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingController: LoadingController,
              private eliteApi: EliteApisProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  gotoTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting Data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentsData(favorite.tournamentId)
      .subscribe( t => this.navCtrl.push(TeamHomePage, favorite.team));

  }
}
