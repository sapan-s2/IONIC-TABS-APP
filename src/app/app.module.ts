import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MyTeamsPage} from "../pages/my-teams/my-teams";
import {GamePage} from "../pages/game/game";
import {TeamsPage} from "../pages/teams/teams";
import {TeamDetailPage} from "../pages/team-detail/team-detail";
import {TournamentsPage} from "../pages/tournaments/tournaments";
import {TeamHomePage} from "../pages/team-home/team-home";
import {StandingsPage} from "../pages/standings/standings";
import { EliteApisProvider } from '../providers/elite-apis/elite-apis';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    GamePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage,
    StandingsPage,
    TeamHomePage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApisProvider
  ]
})
export class AppModule {}
