const fs = require("fs");
function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        console.log("error");
        reject();
      } else {
        resolve(data);
      }
    });
  });
}
function write(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, "utf-8", (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
function append(path, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, "utf-8", (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  });
}
function delet(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        console.log("error");
        reject();
      } else {
        resolve();
      }
    });
  });
}
function problem2(path) {
  read(path)
    .then((data) => {
      console.log("readed file");
      let upperData = data.toUpperCase();
      return write("./upperData.txt", upperData);
    })
    .then(() => {
      return write("./filenames.txt", "upperData.txt");
    })
    .then(() => {
      return read("./upperData.txt");
    })
    .then((data1) => {
      console.log("readed upperData file");
      let lowerData = data1.toLowerCase().replaceAll(". ", ".\n");
      return write("./lowerData.txt", lowerData);
    })
    .then(() => {
      return append("./filenames.txt", "\nlowerData.txt");
    })
    .then(() => {
      return read("./lowerData.txt");
    })
    .then((data2) => {
      console.log("lowerData is readed");
      let sortedData = data2.split(" ").sort().join(" ");
      return write("./sortedData.txt", sortedData);
    })
    .then(() => {
      return append("./filenames.txt", "\nsortedData.txt");
    })
    .then(() => {
      return read("./filenames.txt");
    })
    .then((data3) => {
      return (arr = data3.split("\n"));
    })
    .then((arr) => {
      console.log(arr);
      for (let index in arr) {
        delet(arr[index]);
      }
    });
}
module.exports = problem2;
