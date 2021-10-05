// Problem: required to load large datasets
// potential upgrades:
// 1. limit async operations running in parallel
// 2. priorites for promises
// 3. check for conditions to break
// 4. get number of pending/queued promises
// we need to to turn queue into first in -- quickest out

// good to check that we are still running promises that can finish
// and extract in real time

// GOAL
// 1. [x] add tasks live
// 2. [x] substitute real promise or async action
// 3. [x] add concurrency limit
// 4. [x] attempted retries
// 5. [x] get current pending/queued promises
// 6. [x] ? priority of promises? just do regular heapify
// 7. [x] implement promise.race / promise.all
// 8. [] how to get results after they finish? need to get syntax to be
// const result = await PromiseQueue(promises, limit)

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getTime = () => {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return time;
};

export const fetchPromiseTraditional = () =>
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((resie) => resie.json())
    .then((finalRes) => finalRes);

export const fetchPromise = async () => {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  const res = await fetch(url);
  const jsonify = await res.json();
  return jsonify;
};

export const promiseTransaction = (time) => {
  console.log(getTime(), "start time---");
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(getTime(), "end time----");
      res({ time, endTime: getTime() });
    }, time);
  });
};

export const promiseTransactionRej = (time) => {
  console.log(getTime(), "start time---");
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(getTime(), "end time----");
      // rej({ time, endTime: getTime() });
      const newErr = new Error("Http 403 error");
      newErr.status = 403;
      rej(newErr);
    }, time);
  });
};

export class PromiseQueue {
  constructor(tasks, concurrentLimit) {
    this.tasks = [];
    this.completed = [];
    this.pendingPromises = 0;
    this.rejectPromises = [];
    this.compareFunc = (a, b) => a.priority - b.priority;
  }

  enqueue(promise) {
    const priority = randomIntFromInterval(1, 10);
    return new Promise((res, rej) => {
      this.tasks.push({
        res,
        rej,
        promise,
        priority,
      });
      this.tasks.sort(this.compareFunc);
    });
  }

  shouldContinueDequeue() {
    return this.pendingPromises < 6 && this.tasks.length;
  }

  dequeue() {
    while (this.shouldContinueDequeue()) {
      const { res, rej, promise } = this.tasks.shift();
      try {
        this.pendingPromises++;
        // big help we have access to the .then
        // property
        promise()
          .then((value) => {
            console.log(value, "ending!!!");
            this.pendingPromises--;
            res(value);
            this.completed.push(value);
            this.dequeue();
          })
          .catch((err) => {
            // 500(internal server err) or 504(gateway timeout)
            // should attempt again
            // should not if request is a 400s
            // should also not attempt if over
            // set number of tries
            // if(err.response.status === 500){}
            console.log(err);
            this.pendingPromises--;
            this.rejectPromises.push({ err, promise });
            console.log(err, "inner error");
            this.enqueue(() => promiseTransaction(12345));
            this.dequeue();
          });
      } catch (err) {
        console.log(err, "outer error");
        rej(err);
      }
    }
  }
}
