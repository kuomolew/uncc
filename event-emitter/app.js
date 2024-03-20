const EventEmitter = require("./events");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("An event occurred 1.");
});

myE.on("foo", () => {
  console.log("An event occurred 2.");
});

myE.on("foo", (x) => {
  console.log("An event with the parameter occurred");
  console.log(x);
});

myE.on("bar", () => {
  console.log("An event occurred bar.");
});

myE.emit("foo", "some text");
myE.emit("foo");

myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
