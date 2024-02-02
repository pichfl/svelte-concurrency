import Scheduler from './external/scheduler/scheduler';
import { deferred } from './deferred.js';

const MICROTASK_PROMISE = deferred();

class SvelteScheduler extends Scheduler {
	constructor(...args) {
		super(...args);
		this.isScheduled = false;
	}

	scheduleRefresh() {
		if (this.isScheduled) {
			return;
		}

		MICROTASK_PROMISE.then(() => {
			this.isScheduled = false;
			this.refresh();
		});
	}
}

export default SvelteScheduler;
