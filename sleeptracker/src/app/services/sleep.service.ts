import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
	}
	}

	private addDefaultData() {
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		SleepService.AllOvernightData.sort(function(a, b) {
			let res1 = a.sleepStart.getTime() - b.sleepStart.getTime();
			if (res1 != 0) {
				return res1;
			}
			else {
				return a.sleepEnd.getTime() - b.sleepEnd.getTime();
			}
		})
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		SleepService.AllSleepinessData.sort(function(a, b) {
			let res1 = a.date.getTime() - b.date.getTime();
			if (res1 != 0) {
				return res1;
			}
			else {
				return a.period - b.period;
			}
		})
	}
	public getAllOvernightData() {
		return SleepService.AllOvernightData;
	}

	public getAllSleepinessData() {
		return SleepService.AllSleepinessData;
	}
}
