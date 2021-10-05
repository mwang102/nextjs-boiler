import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import media, { defaultBreakpoints } from "../utils/mediaStyles";
import {
  PromiseQueue,
  promiseTransaction,
  promiseTransactionRej,
  fetchPromise,
  fetchPromiseTraditional,
} from "../js-machine/priorityPromiseQueue";

// const tasks = [
//   promiseTransaction(2000),
//   promiseTransaction(1000),
//   promiseTransaction(3000),
//   promiseTransaction(4000),
//   promiseTransaction(1000),
// ];

const asyncFnNorm = function () {
  return new Promise((res, rej) => {
    res("a");
  });
};

const asyncFn = new Promise((res, rej) => {
  res("a");
});

const asyncFnArrow = () =>
  new Promise((res, rej) => res("b")).then((a) => console.log("after effect"));

const fetchDrinks = async () => {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
  const res = await fetch(url);
  const jsonify = await res.json();
  return jsonify;
};
export default function Home() {
  const [queue, setQueue] = useState();

  useEffect(async () => {
    // const test = asyncFnArrow();
    // console.log(test, "test");
    // const res1 = await asyncFn.then((a) => console.log("a", a));
    // const res2 = await asyncFnArrow().then((a) => console.log("b", a));
    // const res3 = await asyncFnNorm().then((a) => console.log("c", a));
    // const res4 = await fetchDrinks().then((a) => console.log("d", a));
    // const tasks = [
    //   promiseTransaction(10000),
    //   promiseTransaction(2000),
    //   promiseTransaction(3000),
    //   promiseTransaction(1000),
    //   promiseTransaction(1000),
    // ];

    const newQueue = new PromiseQueue();
    setQueue(newQueue);
    const arrFn = function () {
      console.log("execution!!");
    };

    arrFn();
  }, []);

  const handleQueueView = () => {
    console.log(queue);
  };

  const deletePromiseFromQueue = () => {
    queue.dequeue();
  };

  const addPromiseToQueue = () => {
    // () => promiseTransaction(1000)
    // sets the input as a function that has not been called yet
    // fuck of course...
    // queue.enqueue(() => promiseTransaction(3000));
    queue.enqueue(() => fetchPromise());
    // queue.enqueue(() => fetchPromiseTraditional());
  };

  const addPromiseWithRej = () => {
    queue.enqueue(() => promiseTransactionRej(3000));
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
