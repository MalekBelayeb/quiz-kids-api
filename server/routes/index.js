const express = require("express");
const router = express.Router();
//const homeController = require("../controllers/home");
const uploadController = require("../controller/upload");

let routes = app => {
  router.post("/upload", uploadController.uploadFiles);
  router.get("/files", uploadController.getListFiles);
  router.get("/files/:name", uploadController.download);

  return app.use("/", router);
};

module.exports = routes;