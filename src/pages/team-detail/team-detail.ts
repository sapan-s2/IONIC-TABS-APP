import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {EliteApisProvider} from "../../providers/elite-apis/elite-apis";
import * as _ from 'lodash';
import {GamePage} from "../game/game";

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  public team: any={};
  public games: any[];
  private tourneyData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  eliteAPI: EliteApisProvider) {
    this.team = this.navParams.data
    console.log(this.navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamDetailPage');
    this.team = this.navParams.data;
    this.tourneyData = this.eliteAPI.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.teamId === this.team.id || g.team2Id === this.team.id)
      .map( g => {
        let isTeam1 = (g.teamId === this.team.id || g.team2Id === this.team.id)
        let opponentsName = isTeam1 ? g.team2: g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return  {
          gameId: g.id,
          opponent: opponentsName,
          time:  Date.parse(g.time),
          location: g.loction,
          locationUrl: g.locationUrl,
          scoreDisplay: g.scoreDisplay,
          homeAway: (isTeam1? "vs": "at")
        };
      })
      .value();
  }
  private getScoreDisplay(isTeam1: boolean, team1Score: any, team2Score: any) {
          if(team1Score && team2Score){
            var teamScore = (isTeam1? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "w: ": "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
          }
          else return "";
  }

  gameClicked($event,game){
    let sourceGame = this.tourneyData.games.find( g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }


  // goHome(){
  //   // this.navCtrl.push(MyTeamsPage);
  //   this.navCtrl.parent.parent.popToRoot();
  // }
}
