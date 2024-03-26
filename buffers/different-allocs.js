const { Buffer } = require("buffer");

const buffer = Buffer.alloc(10000, 0);

const unsafeBuffer = Buffer.allocUnsafe(10000); // faster but some data can be there

// for (let i = 0; i < unsafeBuffer.length; i++) {
//   if (unsafeBuffer[i] !== 0) {
//     console.log(
//       `Element at position ${i} has value ${unsafeBuffer[i].toString(2)}`
//     );
//   }
// }

// for (let i = 0; i < buffer.length; i++) {
//   if (buffer[i] !== 0) {
//     console.log(`Element at position ${i} has value ${buffer[i].toString(2)}`);
//   }
// }
