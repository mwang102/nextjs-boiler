import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/react";
import { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import media, { defaultBreakpoints } from "../utils/mediaStyles";
import {
  promiseTransaction,
  promiseTransactionRej,
  fetchPromise,
  fetchPromiseTraditional,
} from "../js-machine/priorityPromiseQueue";
import {
  usePromiseQueue,
  PromiseQueueContext,
} from "../js-machine/PromiseQueue.jsx";
import { PromiseQueue } from "../js-machine/attemptOneQueue";

import FunctionPromiseQueue from "../js-machine/functionPromiseQueue";

const tasks = [
  () => promiseTransaction(2000),
  () => promiseTransaction(1000),
  () => promiseTransaction(3000),
  () => promiseTransaction(4000),
  () => promiseTransaction(1000),
];

const fetchDrinks = async () => {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  const res = await fetch(url);
  const jsonify = await res.json();
  return jsonify;
};

export default function Home() {
  const [promiseQueue, setPromiseQueue] = useState();

  useEffect(async () => {
    const promises = new PromiseQueue(tasks, 3);
    // promises.enqueue();
    setPromiseQueue(promises);
  }, []);

  const context = usePromiseQueue();

  const handleQueueView = () => {
    console.log(promiseQueue);
  };

  const addPromiseToQueue = () => {
    // context.enqueue(() => fetchDrinks());
  };

  const addPromiseWithRej = () => {
    //
  };

  const deletePromiseFromQueue = async () => {
    const data = promiseQueue.dequeue();
    promiseQueue.on("completedQueue", (test) => console.log("yOLOOOOO", test));
    //
  };

  return (
    <Layout>
      <Head>
        <title>Create Next Boiler</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <button type="button" onClick={handleQueueView}>
          {" "}
          View Queue{" "}
        </button>
        <button type="button" onClick={addPromiseToQueue}>
          {" "}
          Add to Queue{" "}
        </button>
        <button type="button" onClick={addPromiseWithRej}>
          {" "}
          Add to Queue Rej{" "}
        </button>
        <button type="button" onClick={deletePromiseFromQueue}>
          {" "}
          Delete from Queue{" "}
        </button>
        <h1>Welcome to the bOilEr</h1>
      </section>
    </Layout>
  );
}
