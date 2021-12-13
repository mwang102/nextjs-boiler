// Problem: required to load large datasets
// potential upgrades:
// 1. limit async operations running in parallel
// 2. priorites for promises
// 3. check for conditions to break
// 4. get number of pending/queued promises
// we need to to turn queue into first in -- quickest out

// good to check that we are still running promises that can finish
// and extract in real time

// make the class
const { EventEmitter } = require("events");

export const getTime = () => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return time;
};
// var dateTime = time;

export const promiseTransaction = (time) => {
  console.log(getTime(), "start time--- ");
  return () =>
    new Promise((res, rej) => {
      setTimeout(() => {
        console.log(getTime(), "end time----");
        res({ time, endTime: getTime() });
      }, time);
    });
};

export class PromiseQueue extends EventEmitter {
  constructor(tasks, concurrentLimit) {
    super();
    this.queue = [];
    this.concurrentLimit = concurrentLimit;
    this.completed = [];
    // or sort directly here
    this.tasks = tasks;
    this.pendingPromises = 0;
    this.rejectPromises = [];
    this.extra = [1, 4, 671, 2, 3, 1].sort((a, b) => a - b);
    this.enqueue();
  }

  enqueue() {
    while (this.tasks.length) {
      const promise = this.tasks.shift();
      const pHolder = new Promise((res, rej) => {
        this.queue.push({
          res,
          rej,
          promise,
        });
      });
    }
  }

  shouldContinueDequeue() {
    return this.queue.length && this.concurrentLimit > this.pendingPromises;
  }

  dequeue() {
    while (this.shouldContinueDequeue()) {
      const { rej, res, promise } = this.queue.shift();
      this.pendingPromises++;

      try {
        promise()
          .then((result) => {
            this.pendingPromises--;
            res(result);
            this.completed.push(result);
            if (this.pendingPromises === 0 && this.queue.length === 0) {
              this.emit("completedQueue", this.completed);
            }
            this.dequeue();
          })
          .catch((err) => {
            // 500(internal server err) or 504(gateway timeout)
            // should attempt again
            // should not if request is a 400s
            // should also not attempt if over
            // set number of tries
            // if(err.response.status === 500){}
            this.pendingPromises--;
            this.rejectPromises.push({ err, promise });
            console.log(err, "inner error");
            this.enqueue(() => promiseTransaction(12345));
            rej(err);
            this.dequeue();
          });
      } catch (err) {
        this.pendingPromises--;
        rej(err);
        this.dequeue();
        console.log(err);
      }
    }
  }
}
