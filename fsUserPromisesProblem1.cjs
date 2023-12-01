const { create } = require("domain");
const fs = require("fs");
function createdir(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
function createFile(path, data, start) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${path}/${start}file.txt`, data, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${start}fileis created`);
        resolve();
      }
    });
  });
}
function deleteFile(path, start) {
  return new Promise((resolve, reject) => {
    fs.unlink(`${path}/${start}file.txt`, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log(`${start}fileis deleted`);
        resolve();
      }
    });
  });
}
const data = "no data";
function rescursive(path, start, end) {
  createFile(path, data, start)
    .then(() => {
      return deleteFile(path, start);
    })
    .then(() => {
      if (start < end) {
        rescursive(path, start + 1, end);
      }
    });
}
function problem1(path, limit) {
  createdir(path).then(() => {
    rescursive(path, 1, limit);
  });
}
module.exports = problem1;
