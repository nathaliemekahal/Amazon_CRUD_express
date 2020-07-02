const express = require("express");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const { join } = require("path");

const swaggerDocument = YAML.load(join(__dirname, "./apiDesc.yml"));
//Routes
const productsRoute = require("./services/products");
const reviewsRoutes = require("./services/reviews");
const server = express();
server.use(cors());
server.use(express.json());

server.use("/products", productsRoute);

console.log(join(__dirname, "./apiDesc.yml"));
server.use("/reviews", reviewsRoutes);
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server.listen(3006, () => {
  console.log("working on port 3006");
});
