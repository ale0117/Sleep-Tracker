import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
	public static SleepQuality = ["",//Time period starts at 1
	'terrible', //1
	'poor', //2
	'okay', //3
	'good', //4
	'amazing']; //5

	public sleepStart:Date;
	public sleepEnd:Date;
	public quality:number;

	constructor(sleepStart:Date, sleepEnd:Date, quality:number) {
		super();
		this.sleepStart = sleepStart;
		this.sleepEnd = sleepEnd;
		this.quality = quality;
	}

	override summaryString():string {
		var sleepStart_ms = this.sleepStart.getTime();
		var sleepEnd_ms = this.sleepEnd.getTime();

		// Calculate the difference in milliseconds
		var difference_ms = sleepEnd_ms - sleepStart_ms;
		    
		// Convert to hours and minutes
		return Math.floor(difference_ms / (1000*60*60)) + " hours, " + Math.floor(difference_ms / (1000*60) % 60) + " minutes of " + OvernightSleepData.SleepQuality[this.quality] + " sleep";
	}

	override dateString():string {
		return this.sleepStart.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'});
	}

	timeString():string {
		return this.sleepStart.toLocaleTimeString('en-US');
	}
}
