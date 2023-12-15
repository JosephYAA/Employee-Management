const Employee = require('../models/employee');
const Department = require('../models/department');

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const department = req.body.department;
  let departmentId;
  Department.findOne({name: department})
  .then(data => {
    departmentId = data._id;
    const employee = new Employee({
        name: req.body.name,
        surname: req.body.surname,
        department: departmentId
    });

    employee
        .save(employee)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Employee."
        });
        });
    })
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Employee.find(condition).populate("department", "-_id -__v")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Employee"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Employee.findById(id).populate("department", "-_id -__v ")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Employee with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Employee with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).populate("department", "-_id -__v")
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`
        });
      } else res.send({ message: "Employee was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.findByIdAndDelete(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Employee with id=${id}. Maybe Employee was not found!`
        });
      } else {
        res.send({
          message: "Employee was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Employee.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employees were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Employees."
      });
    });
};
