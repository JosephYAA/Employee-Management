module.exports = app => {
  const departments = require("../controllers/department.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", departments.create);

  // Retrieve all departments
  router.get("/", departments.findAll);


  // Retrieve a single Tutorial with id
  router.get("/:id", departments.findOne);

  // Update a Tutorial with id
  router.put("/:id", departments.update);

  // Delete a Tutorial with id
  router.delete("/:id", departments.delete);

  // Create a new Tutorial
  router.delete("/", departments.deleteAll);

  app.use("/api/departments", router);
};