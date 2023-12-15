const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
        name: String,
        surname: String,
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
          }
    }
)

module.exports = mongoose.model('Employee', employeeSchema);