// const fs = require("fs/promises");

// (async () => {
//   console.time("writeMany");
//   try {
//     const fileHandle = await fs.open("./test.txt", "a");
//     for (let i = 1; i <= 1000000; i++) {
//       await fileHandle.write(`${i}\n`);
//     }

//     fileHandle.close();
//   } catch (e) {
//     console.log(e);
//   }
//   console.timeEnd("writeMany");
// })();

// const fs = require("fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("test.txt", "w", (err, fd) => {
//     for (let i = 1; i <= 1000000; i++) {
//       const buff = Buffer.from(`${i}\n`, "utf-8");
//       fs.writeSync(fd, buff);
//     }

//     console.timeEnd("writeMany");
//   });
// })();

const fs = require("fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("./test.txt", "w");
  const stream = fileHandle.createWriteStream();

  for (let i = 1; i <= 1000000; i++) {
    const buff = Buffer.from(`${i}\n`, "utf-8");
    stream.write(buff);
  }
  console.timeEnd("writeMany");
})();
