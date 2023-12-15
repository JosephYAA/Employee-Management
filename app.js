const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');


const app = express();

connectDb();

app.use(express.json());
app.use(express.static('public'))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.redirect('/departments'); //this will redirect page to /users
  });

app.get('/departments', (req,res) => {
    res.sendFile('departments.html', { root: './views' })
});
app.get('/employees', (req,res) => {
    res.sendFile('employees.html', { root: './views' })
});

require("./routes/department.routes")(app);
require("./routes/employee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});