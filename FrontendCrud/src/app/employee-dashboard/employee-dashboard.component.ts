import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../Model/employee-dashboard.model';
import { ApiService } from '../Service/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  EmployeeModelobj = new EmployeeModel('', '', '', '', '');
  Employeedata: any;
  EmployeeId!: any;

  constructor(private api: ApiService) {}
  Addform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    designation: new FormControl(''),
    mobileNo: new FormControl(''),
  });

  ngOnInit(): void {
    this.getAllEmployee();
  }

  /* Method for Making Post Request */
  postEmployeeDetails() {
    this.EmployeeModelobj = new EmployeeModel(
      this.Addform.value.firstName,
      this.Addform.value.lastName,
      this.Addform.value.emailId,
      this.Addform.value.designation,
      this.Addform.value.mobileNo
    );
    this.api.createEmployee(this.EmployeeModelobj).subscribe(() => {
      alert('Data Added Successfully');
      this.Addform.reset();
      this.getAllEmployee();
    });
  }

  /* Method for Making Get Request */
  getAllEmployee() {
    this.api.getEmployee().subscribe((data: any) => {
      this.Employeedata = data;
    });
  }

  /* Method for Making Delete Request */
  delEmployee(data: any) {
    this.api.deleteEmployee(data._id).subscribe(() => {
      alert('Data Deleted Successfully');
      this.getAllEmployee();
    });
  }

  /* Method for filling Modal form for Update Request*/
  onEdit(data: any) {
    this.EmployeeId = data._id;
    this.Addform.controls['firstName'].setValue(data.firstName);
    this.Addform.controls['lastName'].setValue(data.lastName);
    this.Addform.controls['emailId'].setValue(data.emailId);
    this.Addform.controls['designation'].setValue(data.designation);
    this.Addform.controls['mobileNo'].setValue(data.mobileNo);
  }

  /* Method for Making Put Request */
  updateEmployeeDetails() {
    this.EmployeeModelobj.firstName = this.Addform.value.firstName;
    this.EmployeeModelobj.lastName = this.Addform.value.lastName;
    this.EmployeeModelobj.emailId = this.Addform.value.emailId;
    this.EmployeeModelobj.designation = this.Addform.value.designation;
    this.EmployeeModelobj.mobileNo = this.Addform.value.mobileNo;
    this.api
      .updateEmployee(this.EmployeeModelobj, this.EmployeeId)
      .subscribe(() => {
        alert('Data Updated Successfully');
        this.Addform.reset();
        this.getAllEmployee();
      });
  }
}
