//event loop
// console.log("Start");

// setTimeout(() => {
//   console.log("Timer 1 is finished");
// }, 0);

// Promise.resolve().then(() => console.log("Promise resolved"));

// console.log("End");

//Emitters

const EventEmitter = require("events");
const myEmitter = new EventEmitter();

const listener = (name) => {
  console.log(`Hello: ${name}`);
};

//event.on(event, listener) //register an event listener
myEmitter.on("greet", listener);

//emits the event
myEmitter.emit("greet", "Karan");
myEmitter.removeListener("greet", listener);
myEmitter.emit("greet", "Singh");
