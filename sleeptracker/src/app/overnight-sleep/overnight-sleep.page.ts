import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-overnight-sleep',
  templateUrl: './overnight-sleep.page.html',
  styleUrls: ['./overnight-sleep.page.scss'],
})
export class OvernightSleepPage implements OnInit {
  public startString: string;
  public endString: string;
  public sleepQuality: string;
  public columns: string[];
  public sleepData: string[][];

  constructor(public sleepService: SleepService, public alertController: AlertController, public firebaseService:FirebaseService) {
    this.sleepData = [];
    this.firebaseService.loadSleepLogs().then((value) => {
      for (let log of this.sleepService.getAllOvernightData()) {
        this.sleepData.push([log.dateString(), log.timeString(), log.summaryString()])
      }
    });
    let date = new Date();
    let offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    this.startString = date.toISOString().substring(0,16) + ":00-08:00";
    this.endString = date.toISOString().substring(0,16) + ":00-08:00";
    this.sleepQuality = '';
    this.columns = ["Start Date", "Start Time", "Description"];
  }

  ngOnInit() {
  }

  removeSleepLog(idx:number) {
    let id = this.sleepService.getAllOvernightData()[idx].id;
    this.sleepData = [];
    this.firebaseService.deleteSleepDoc(id).then((value) => {
      this.firebaseService.loadSleepLogs().then((value) => {
        for (let log of this.sleepService.getAllOvernightData()) {
          this.sleepData.push([log.dateString(), log.timeString(), log.summaryString()])
        }
      });
    });
  }

  addSleepLog() {
    let startTime = new Date(this.startString);
    let endTime = new Date(this.endString);
    if (this.sleepQuality == '') {
      this.alertController.create({
        message: 'Please make sure all fields are filled',
        header: 'Alert',
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
    }
    else if (startTime.getTime() >= endTime.getTime()) {
      this.alertController.create({
        message: 'Please make sure your end time is after your start time',
        header: 'Alert',
        buttons: ['OK']
      }).then((alert) => {
        alert.present();
      });
    }
    else {
      this.sleepData = [];
      this.firebaseService.addSleepDoc(new OvernightSleepData(startTime, endTime, Number(this.sleepQuality))).then((value) => {
        this.firebaseService.loadSleepLogs().then((value) => {
          for (let log of this.sleepService.getAllOvernightData()) {
            this.sleepData.push([log.dateString(), log.timeString(), log.summaryString()])
          }
        });
      });
    }
  }
}
