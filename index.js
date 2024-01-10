const fs = require(`fs`); //fs-file system
const http = require(`http`); //creating http server
const { json } = require("stream/consumers");
const url = require(`url`); //creating http server

//import modules:
const slugify = require(`slugify`); //the last part of a url that identifies the resourse the website is displaying
const replaceTemplate = require("./1-node-farm/modules/replaceTemplate");
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
//specify requests that should be done ONCE (will be loaded in the begining and then reused), SYNCHRONOUSLY:
const tempOverview = fs.readFileSync(
  `./1-node-farm/templates/template-overview.html`,
  `utf-8`
); //text file of html code of template-overview
const tempCard = fs.readFileSync(
  `./1-node-farm/templates/template-card.html`,
  `utf-8`
); //text file of html code of template-card
const tempProduct = fs.readFileSync(
  `./1-node-farm/templates/template-product.html`,
  `utf-8`
); //text file of html code of template-product page

const data = fs.readFileSync(`./1-node-farm/dev-data/data.json`, `utf-8`);
const dataObj = JSON.parse(data); //turns json file to object

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

//////////////////////

//specify stuff that will be called with every request, ASYNCHRONOUSLY:
const server = http.createServer((request, resp) => {
  const { query, pathname } = url.parse(request.url, true);

  //Building overview page:
  if (pathname === `/` || pathname === `/overview`) {
    resp.writeHead(200, { "Content-type": `text/html` });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(``);
    // console.log(cardsHtml);

    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);
    resp.end(output);
  }
  //Building product page:
  else if (pathname === `/product`) {
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    resp.writeHead(200, { "Content-type": `text/html` });
    resp.end(output);
  }
  //API:
  else if (pathname === `/api`) {
    resp.writeHead(200, { "Content-type": `application/json` });
    resp.end(data);
  }
  //NOT FOUND
  else {
    resp.writeHead(404, {
      //header is sent BEFORE resposnse.end
      "Content-type": `text/html`,
      "my-own-header": `Hello hello`,
    });
    resp.end(`<h1>Page not found</h1>`);
  }
});

//Listen to request
server.listen(5500, `127.0.0.1`, () => {
  console.log(`start listening`);
});
