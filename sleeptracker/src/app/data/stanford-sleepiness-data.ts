/* from the Stanford Sleepiness Scale */
/* https://web.stanford.edu/~dement/sss.html */

import { SleepData } from './sleep-data';

export class StanfordSleepinessData extends SleepData {
	public static ScaleValues = [undefined,//Sleepiness scale starts at 1
	'Feeling active, vital, alert, or wide awake', //1
	'Functioning at high levels, but not at peak; able to concentrate', //2
	'Awake, but relaxed; responsive but not fully alert', //3
	'Somewhat foggy, let down', //4
	'Foggy; losing interest in remaining awake; slowed down', //5
	'Sleepy, woozy, fighting sleep; prefer to lie down', //6
	'No longer fighting sleep, sleep onset soon; having dream-like thoughts']; //7

	public static TimePeriods = ["",//Time period starts at 1
	'6-9 a.m.', //1
	'9 a.m.-noon', //2
	'noon-3 p.m.', //3
	'3-6 p.m.', //4
	'6-9 p.m.']; //5

	public loggedValue:number;
	public period: number;

	constructor(loggedValue:number, loggedPeriod:number, loggedAt:Date = new Date()) {
		super();
		this.loggedValue = loggedValue;
		this.date = loggedAt;
		this.period = loggedPeriod;
	}

	override summaryString():string {
		return this.loggedValue + ": " + StanfordSleepinessData.ScaleValues[this.loggedValue];
	}

	override dateString():string {
		return this.date.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'});
	}
}
