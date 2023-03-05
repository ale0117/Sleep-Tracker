import { Injectable } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, getDocs, collection, doc, setDoc, deleteDoc } from '@angular/fire/firestore';
import { SleepService } from './sleep.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: Firestore, public sleepService: SleepService) { }

  async loadSleepLogs() {
    SleepService.AllOvernightData = []
    const querySnapshot = await getDocs(collection(this.firestore, "sleep"));
    querySnapshot.forEach((doc) => {
      let temp = new OvernightSleepData(new Date(doc.data()['sleepStart']), new Date(doc.data()['sleepEnd']), doc.data()['quality']);
      temp.id = doc.id;
      this.sleepService.logOvernightData(temp);
    });
  }

  async loadSleepinessLogs() {
    SleepService.AllSleepinessData = []
    const querySnapshot = await getDocs(collection(this.firestore, "sleepiness"));
    querySnapshot.forEach((doc) => {
      let temp = new StanfordSleepinessData(doc.data()['loggedValue'], doc.data()['period'], new Date(doc.data()['date']));
      temp.id = doc.id;
      this.sleepService.logSleepinessData(temp);
    });
  }

  addSleepDoc(sleepLog: OvernightSleepData): Promise<void> {
    const document = doc(collection(this.firestore, 'sleep'));
    const docData = {
      sleepStart: sleepLog.sleepStart.toLocaleString(),
      sleepEnd: sleepLog.sleepEnd.toLocaleString(),
      quality: sleepLog.quality
    }
    return setDoc(document, docData);
  }

  addSleepinessDoc(sleepinessLog: StanfordSleepinessData): Promise<void> {
    const document = doc(collection(this.firestore, 'sleepiness'));
    const docData = {
      date: sleepinessLog.date.toLocaleString(),
      period: sleepinessLog.period,
      loggedValue: sleepinessLog.loggedValue,
    }
    return setDoc(document, docData);
  }

  deleteSleepDoc(id: string): Promise<void> {
    const document = doc(this.firestore, 'sleep', id);
    return deleteDoc(document);
  }

  deleteSleepinessDoc(id: string): Promise<void> {
    const document = doc(this.firestore, 'sleepiness', id);
    return deleteDoc(document);
  }
}
