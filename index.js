const fs = require(`fs`); //fs-file system
const http = require(`http`); //creating http server
const { json } = require("stream/consumers");
const url = require(`url`); //creating http server

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

const replaceTemplate = function (temp, product) {
  //  /{%PRODUCTNAME%}/g means global so ALL these will be replacsed not only the 1st one.
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, `not-organic`);

  return output;
};

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

//////////////////////

//specify stuff that will be called with every request, ASYNCHRONOUSLY:
const server = http.createServer((request, resp) => {
  const pathName = request.url;

  //Building overview page:
  if (pathName === `/` || pathName === `/overview`) {
    resp.writeHead(200, { "Content-type": `text/html` });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join(``);
    // console.log(cardsHtml);

    const output = tempOverview.replace(`{%PRODUCT_CARDS%}`, cardsHtml);
    resp.end(output);
  }
  //Building product page:
  else if (pathName === `/product`) {
    resp.writeHead(200, { "Content-type": `text/html` });
    resp.end(tempProduct);
  }
  //API:
  else if (pathName === `/api`) {
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

//*-----------------------------------------Lesson 12

//ROUTING

//*-----------------------------------------Lesson 13
