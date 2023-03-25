import mongoose from "mongoose";
const Schema = mongoose.Schema;

/* Define collection and schema */
let EmployeeSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  designation: {
    type: String,
  },
  mobileNo: {
    type: String,
  },
});

const Employee = new mongoose.model("Employee", EmployeeSchema);
export { Employee };
