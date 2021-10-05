function FunctionPromiseQueue(concurrencyLimit, promises) {
  this.concurrencyLimit = concurrencyLimit;
  this.queue = promises;
  this.pendingPromises = 0;
}

FunctionPromiseQueue.prototype.shouldContinueDequeuing = function () {
  return this.queue.length && this.pendingPromises < this.concurrencyLimit;
};

FunctionPromiseQueue.prototype.enqueue = function (promise) {
  //
};

FunctionPromiseQueue.prototype.dequeue = function () {
  //
};

export default FunctionPromiseQueue;
