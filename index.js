const fs = require(`fs`); //fs-file system
const http = require(`http`); //creating http server

/////////////////////////////////////

//SYNCHROMOUS blocking way
// const textIn = fs.readFileSync(`./1-node-farm/txt/input.txt`, `utf-8`);
// console.log(textIn);

// const textOut = `some text here lalala: ${textIn}.\n Created on ${Date.now()}`;
// fs.writeFileSync(`./1-node-farm/txt/output.txt`, textOut);
// console.log(`File created!`);

//ASYNCHROMOUS non-blocking way
// fs.readFile(`./1-node-farm/txt/start.txt`, `utf-8`, (err, data) => {
//   console.log(data);
// });
// console.log(`read file 1`);

// fs.readFile(`./1-node-farm/txt/start.txt`, `utf-8`, (err, data1) => {
//   //output of this data will be `read-this`
//   if (err) return console.log(`doesnt work`);

//   fs.readFile(`./1-node-farm/txt/${data1}.txt`, `utf-8`, (err, data2) => {
//     console.log(data2);

//     fs.readFile(`./1-node-farm/txt/append.txt`, `utf-8`, (err, data3) => {
//       console.log(data3);

//       fs.writeFile(
//         `./1-node-farm/txt/final.txt`,
//         `${data2}\n${data3}`,
//         `utf-8`,
//         (err) => {
//           console.log(`file done`);
//         }
//       );
//     });
//   });
// });

//*-----------------------------------------Lesson 11

//SERVER

//Create server and response
const server = http.createServer((request, resp) => {
  console.log(request);
  resp.end(`Hello from the server`);
});

//Listen to request
server.listen(5500, `127.0.0.1`, () => {
  console.log(`start listening`);
});
