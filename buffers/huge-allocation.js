const { Buffer } = require("buffer");

const b = Buffer.alloc(3e9); // 1 mln bytes (1GB)

setInterval(() => {
  //   for (let i = 0; i < b.length; i++) {
  //     b[i] = 0x22;
  //   }

  b.fill(0x22);
}, 5000);
