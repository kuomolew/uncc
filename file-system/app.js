const fs = require("fs/promises");

(async () => {
  //commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to a file";

  const createFile = async (path) => {
    try {
      // if we do have this file open and close it
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      return console.log(`The file ${path} already exists`);
    } catch (e) {
      // if we don't create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(`File ${path} doesn't exist`);
      } else {
        console.log("An error occured during removing the file:");
        console.log(e);
      }
    }
  };

  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(`${oldPath} renamed to ${newPath}`);
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(`File ${oldPath} or destination ${newPath} doesn't exist`);
      } else {
        console.log("An error occured during renaming the file:");
        console.log(e);
      }
    }
  };

  const addToFile = async (path, content) => {
    try {
      const fileHandle = await fs.open(path, "a");
      fileHandle.write(content);
      console.log(`Content ${content} was added to ${path}`);
      fileHandle.close();
    } catch (e) {
      if (e.code === "ENOENT") {
        console.log(`File ${path} doesn't exist`);
      } else {
        console.log("An error occured during adding content the file:");
        console.log(e);
      }
    }
  };

  const commandFileHandler = await fs.open("./command.txt", "r");

  commandFileHandler.on("change", async () => {
    // console.log("The file was changed");

    const size = (await commandFileHandler.stat()).size;
    const buff = Buffer.alloc(size);

    const offset = 0;
    const length = buff.byteLength;
    const position = 0;

    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    // create a file:
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);

      createFile(filePath);
    }

    // delete a file:
    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);

      deleteFile(filePath);
    }

    // rename a file:
    // rename a file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const index = command.indexOf(" to ");
      const oldFilePath = command.substring(RENAME_FILE.length + 1, index);
      const newFilePath = command.substring(index + 4);

      renameFile(oldFilePath, newFilePath);
    }

    // add to file:
    // add to a file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const dividerText = " this content: ";
      const dividerIndex = command.indexOf(dividerText);

      const path = command.substring(ADD_TO_FILE.length + 1, dividerIndex);
      const content = command.substring(dividerIndex + dividerText.length);

      addToFile(path, content);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();
