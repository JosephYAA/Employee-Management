const Department = require('../models/department');

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const department = new Department({
    name: req.body.name,
  });

  department
    .save(department)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Department."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Department.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Departments."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Department.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Department with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Department with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Department.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Department with id=${id}. Maybe Department was not found!`
        });
      } else res.send({ message: "Department was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Department with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Department.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Department with id=${id}. Maybe Department was not found!`
        });
      } else {
        res.send({
          message: "Department was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Department with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Department.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Departments were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Departments."
      });
    });
};
