import { Task } from "./task";
import {
  task,
  restartable,
  enqueued,
  drop,
  keepLatest,
  unbounded,
} from "./task-builder";

import { yieldableSymbol, YIELDABLE_CONTINUE } from "./external/yieldables";

export function timeout(ms) {
  return {
    [yieldableSymbol](taskInstance, resumeIndex) {
      let id = setTimeout(() => {
        taskInstance.proceed(resumeIndex, YIELDABLE_CONTINUE, null);
      }, ms);

      return () => {
        clearInterval(id);
      };
    }
  };
}

export {
  Task,
  task,
  restartable,
  enqueued,
  drop,
  keepLatest,
  unbounded,
};

