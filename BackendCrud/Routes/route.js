import express from "express";
const employeeRoute = express.Router();

/* Employee model */
import { Employee } from "../Model/employee.js";

/* Post employee Route*/
employeeRoute.route("/create").post((req, res) => {
  Employee.create(req.body, (error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

/* Get All employee Route */
employeeRoute.route("/").get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return error;
    } else {
      res.json(data);
    }
  });
});

/* Get Specific employee Record Route */
/* employeeRoute.route('/read/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return (error)
    } else {
      res.json(data)
    }
  })
}) */

/* Put employee Route */
employeeRoute.route("/update/:id").put((req, res) => {
  Employee.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return error;
      } else {
        res.json(data);
        console.log("Data updated successfully");
      }
    }
  );
});

/* Delete employee Route */
employeeRoute.route("/delete/:id").delete((req, res) => {
  Employee.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return error;
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

export { employeeRoute };
