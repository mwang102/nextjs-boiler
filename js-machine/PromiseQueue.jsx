// 3:53pm
import { useState, useContext, createContext } from "react";

export const PromiseQueueContext = createContext({});

const PromiseQueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [concurrencyLimit, setConcurrencyLimit] = useState(2);
  const [pendingPromises, setPendingPromises] = useState(0);

  const enqueue = (promise) =>
    new Promise((res, rej) => {
      const futurePromise = {
        res,
        rej,
        promise,
      };
      setTasks([...tasks, futurePromise]);
    });

  const shouldContinueDequeueing = () =>
    tasks.length && pendingPromises < concurrencyLimit;

  const dequeue = () => {
    while (shouldContinueDequeueing()) {
      // const updatedQueue = [...tasks].slice(1);
      const { promise, res, rej } = tasks.shift();
      // setTasks(updatedQueue);
      try {
        setPendingPromises(pendingPromises + 1);
        promise()
          .then((result) => {
            setPendingPromises(pendingPromises - 1);
            res(result);
            console.log("completing promises", [...completed, result]);
            setCompleted([...completed, 1]);
            // setCompleted([...completed, result]);
            // try to dequeue
            dequeue();
          })
          .catch((err) => {});
      } catch (err) {
        console.log(err);
      }
      // console.log(pendingPromise, updatedQueue, "new dequeue");
    }
  };

  const values = {
    queue,
    tasks,
    completed,
    enqueue,
    dequeue,
  };

  return (
    <PromiseQueueContext.Provider value={values}>
      {children}
      <div> extra </div>
    </PromiseQueueContext.Provider>
  );
};

export const usePromiseQueue = () => useContext(PromiseQueueContext);

export default PromiseQueueProvider;
