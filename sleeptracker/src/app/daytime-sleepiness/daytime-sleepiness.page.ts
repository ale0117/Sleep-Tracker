import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-daytime-sleepiness',
  templateUrl: './daytime-sleepiness.page.html',
  styleUrls: ['./daytime-sleepiness.page.scss'],
})
export class DaytimeSleepinessPage implements OnInit {
  public dateString: string;
  public sleepinessLevel: string;
  public timePeriod: string;
  public columns: string[];
  public sleepinessData: string[][];

  constructor(public sleepService: SleepService, public firebaseService:FirebaseService, public alertController: AlertController) { 
    this.sleepinessData = [];
    this.firebaseService.loadSleepinessLogs().then((value) => {
      for (let log of this.sleepService.getAllSleepinessData()) {
        this.sleepinessData.push([log.dateString(), StanfordSleepinessData.TimePeriods[log.period], log.summaryString()])
      }
    });
    let date = new Date();
    let offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    this.dateString = date.toISOString().substring(0,16) + ":00-08:00";
    this.sleepinessLevel = '';
    this.timePeriod = '';
    this.columns = ["Date", "Period", "Description"];
  }

  ngOnInit() {
  }
  removeSleepinessLog(idx:number) {
    let id = this.sleepService.getAllSleepinessData()[idx].id;
    this.sleepinessData = [];
    this.firebaseService.deleteSleepinessDoc(id).then((value) => {
      this.firebaseService.loadSleepinessLogs().then((value) => {
        for (let log of this.sleepService.getAllSleepinessData()) {
          this.sleepinessData.push([log.dateString(), StanfordSleepinessData.TimePeriods[log.period], log.summaryString()])
        }
      });
    });
  }

  addSleepinessLog() {
    if (this.sleepinessLevel != '' && this.timePeriod != '') {
      this.sleepinessData = [];
      this.firebaseService.addSleepinessDoc(new StanfordSleepinessData(Number(this.sleepinessLevel), Number(this.timePeriod), new Date(this.dateString))).then((value) => {
        this.firebaseService.loadSleepinessLogs().then((value) => {
          for (let log of this.sleepService.getAllSleepinessData()) {
            this.sleepinessData.push([log.dateString(), StanfordSleepinessData.TimePeriods[log.period], log.summaryString()])
          }
        });
      });
    }
    else {
      this.alertController.create({
        message: 'Please make sure all fields are filled',
        header: 'Alert',
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
    }
  }
}
