import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	public sleepLogCount: number;
	public avgSleepHours: number;
	public avgSleepHoursString: string;
	public avgSleepQuality: number;
	public sleepinessLogCount: number;
	public avgSleepinessLevel: number;
	
  	constructor(public sleepService:SleepService, public firebaseService:FirebaseService) {
		this.sleepLogCount = 0;
		this.avgSleepHours = 0;
		this.avgSleepHoursString = '';
		this.avgSleepQuality = 0;
		this.firebaseService.loadSleepLogs().then((value) => {
			for (let log of this.sleepService.getAllOvernightData()) {
				this.sleepLogCount += 1;
				this.avgSleepHours += log.sleepEnd.getTime() - log.sleepStart.getTime();
				this.avgSleepQuality += log.quality;
			}
			this.avgSleepQuality = this.avgSleepQuality / this.sleepLogCount;
			this.avgSleepHours = this.avgSleepHours / this.sleepLogCount;
			this.avgSleepHoursString = Math.floor(this.avgSleepHours / (1000*60*60)) + " hours and " + Math.floor(this.avgSleepHours / (1000*60) % 60) + " minutes ";
		});
		this.sleepinessLogCount = 0;
		this.avgSleepinessLevel = 0;
		this.firebaseService.loadSleepinessLogs().then((value) => {
			for (let log of this.sleepService.getAllSleepinessData()) {
				this.sleepinessLogCount += 1;
				this.avgSleepinessLevel += log.loggedValue;
			}
			this.avgSleepinessLevel = this.avgSleepinessLevel / this.sleepinessLogCount;
		});
	}

	ngOnInit() {
	}

}