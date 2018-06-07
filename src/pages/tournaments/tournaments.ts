import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {TeamsPage} from "../teams/teams";
import {EliteApisProvider} from "../../providers/elite-apis/elite-apis";

/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  private tournaments: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private eliteApis: EliteApisProvider, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: "Getting Started..."
    });
    loader.present().then(() => {
      this.eliteApis.getTournaments().then(data => this.tournaments = data);
      loader.dismiss()
    });
  }


  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage,tourney);
  }
}
