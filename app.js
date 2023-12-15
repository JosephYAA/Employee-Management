const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDb = require('./config/db');


const app = express();

connectDb();

app.use(express.json());
app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/departments');
  });

app.get('/departments', (req,res) => {
    res.sendFile('departments.html', { root: './views' })
});
app.get('/employees', (req,res) => {
    res.sendFile('employees.html', { root: './views' })
});

require("./routes/department.routes")(app);
require("./routes/employee.routes")(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});