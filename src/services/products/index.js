const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");
const { join } = require("path");
const multer = require("multer");
const pump = require("pump");
const { Transform } = require("json2csv");
const {
  readFile,
  writeFile,
  createReadStream,
  createWriteStream,
} = require("fs-extra");
const upload = multer({});
const { xml2js } = require("xml-js");
const { begin } = require("xmlbuilder");
const axios = require("axios");
const PDFDocument = require("pdfkit");

const router = express.Router();

const productsFilePath = path.join(__dirname, "products.json");

router.get("/", (req, res) => {
  const fileContent = fs.readFileSync(productsFilePath).toString();

  res.send(JSON.parse(fileContent));
});
//
router.get("/csv", (req, res) => {
  const data = createReadStream(join(__dirname, "./products.json"));
  const json2csv = new Transform({
    fields: [
      "id",
      "name",
      "description",
      "brand",
      "imageUrl",
      "category",
      "price",
      "updatedAt",
    ],
  });
  res.setHeader("Content-Disposition", "attachment; filename=products.csv");
  pump(data, json2csv, res);
});
//
router.post("/sumTwoPrices", async (req, res) => {
  let id1 = req.query.id1;
  let id2 = req.query.id2;
  const productsArray = JSON.parse(
    fs.readFileSync(productsFilePath).toString()
  );

  let products = productsArray.filter(
    (product) => product._id === id1 || product._id === id2
  );
  let prices = products.map((product, index) => product.price);
  //let pricesJSON = JSON.stringify(prices);
  // console.log(typeof pricesJSON);

  const xmlBody = begin()
    .ele("soap:Envelope", {
      "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
      "xmlns:soap": "http://schemas.xmlsoap.org/soap/envelope/",
    })
    .ele("soap:Body")
    .ele("Add", {
      xmlns: "http://tempuri.org/",
    })
    .ele("intA")
    .text(prices[0])
    .up()
    .ele("intB")
    .text(prices[1])
    .end();
  //
  const response = await axios({
    method: "post",
    url: "http://www.dneonline.com/calculator.asmx?op=Add",
    data: xmlBody,
    headers: { "Content-type": "text/xml" },
  });
  const xml = response.data;

  const options = { ignoreComment: true, alwaysChildren: true, compact: true };
  const result = xml2js(xml, options);
  res.send(
    "SUM OF TWO PRICES IS:" +
      " " +
      result["soap:Envelope"]["soap:Body"]["AddResponse"]["AddResult"]["_text"]
  );
});
router.get("/:id", (req, res) => {
  const productsArray = JSON.parse(
    fs.readFileSync(productsFilePath).toString()
  );
  let filteredArray = productsArray.filter(
    (product) => product._id === req.params.id
  );

  res.send(filteredArray);
});

router.post("/", (req, res) => {
  const newProduct = {
    ...req.body,
    _id: uniqid(),
    createdAt: new Date() + new Date().getHours(),
  };
  productsArray = JSON.parse(fs.readFileSync(productsFilePath).toString());
  productsArray.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(productsArray));
  res.status(201).send("ok");
});

router.delete("/:id", (req, res) => {
  const productsArray = JSON.parse(
    fs.readFileSync(productsFilePath).toString()
  );
  let filteredArray = productsArray.filter(
    (product) => product._id !== req.params.id
  );
  fs.writeFileSync(productsFilePath, JSON.stringify(filteredArray));
  res.status(200).send("ok");
});
router.put("/:id", (req, res) => {
  let productsArray = JSON.parse(fs.readFileSync(productsFilePath).toString());
  index = productsArray.findIndex((product) => product._id === req.params.id);

  let filteredArray = productsArray.filter(
    (product) => product._id !== req.params.id
  );
  let replacement = {
    _id: req.params.id,
    ...req.body,
    updatedAt: new Date() + new Date().getHours(),
  };
  filteredArray.splice(index, 0, replacement);
  // filteredArray.push(replacement)
  fs.writeFileSync(productsFilePath, JSON.stringify(filteredArray));
  res.send(ok);
});
//Images Path
const studentsFolderPath = join(
  __dirname,
  "../../../amazon/public/img/Products"
);
//POST images
router.post(
  "/:id/uploadImage",
  upload.single("productImage"),
  async (req, res, next) => {
    try {
      await writeFile(
        join(
          studentsFolderPath,
          req.params.id + "." + req.file.originalname.split(".").pop()
        ),
        req.file.buffer
      );
      const productsArray = JSON.parse(
        fs.readFileSync(productsFilePath).toString()
      );
      productsArray.forEach((product) => {
        if (product._id === req.params.id) {
          product["imageUrl"] = ` http://localhost:3000/img/Products/${
            req.params.id
          }.${req.file.originalname.split(".").pop()}`;
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(productsArray));
        res.send("uploaded successfully");
      });
    } catch (error) {}
  }
);
router.get("/:id/exportToPDF", (req, res) => {
  const productsArray = JSON.parse(
    fs.readFileSync(productsFilePath).toString()
  );
  let filteredArray = productsArray.filter(
    (product) => product._id === req.params.id
  );
  // res.send(filteredArray);

  const doc = new PDFDocument();
  doc.pipe(createWriteStream("new.pdf"));

  doc
    .font("public/fonts/PalatinoBold.ttf")
    .fontSize(20)
    .text(
      "NAME: " + JSON.stringify(filteredArray[0].name).replace(/"/g, ""),
      100,
      100
    );

  doc
    .font("public/fonts/PalatinoBold.ttf")
    .fontSize(18)
    .text(
      "DESCRIPTION: " +
        JSON.stringify(filteredArray[0].description).replace(/"/g, ""),
      100,
      130
    );

  doc
    .font("public/fonts/PalatinoBold.ttf")
    .fontSize(16)
    .text("PRICE: " + JSON.stringify(filteredArray[0].price) + " $", 100, 160);
  doc.image(filteredArray[0].imageUrl);

  doc.end();

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${req.params.id}.pdf`
  );
  //res.download(doc);
  var filestream = createReadStream(join(__dirname, "../../../new.pdf"));
  //
  pump(filestream, res);
});

module.exports = router;
