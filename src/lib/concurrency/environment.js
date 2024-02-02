import { Environment } from './external/environment';
import { deferred } from './deferred.js';

const MICROTASK_PROMISE = Promise.resolve();

export class SvelteEnvironment extends Environment {
	assert(message, test) {
		// TODO: use a more Svelte-specific invariant?
		if (!test) {
			throw new Error(message);
		}
	}

	async(callback) {
		MICROTASK_PROMISE.then(callback);
	}

	reportUncaughtRejection(error) {
		Promise.reject(error);
	}

	defer() {
		return deferred();
	}

	globalDebuggingEnabled() {
		return false;
	}
}

export const SVELTE_ENVIRONMENT = new SvelteEnvironment();
