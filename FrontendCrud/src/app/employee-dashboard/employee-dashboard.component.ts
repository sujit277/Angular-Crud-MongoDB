import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms"
import { EmployeeModel } from "../Model/employee-dashboard.model";
import { ApiService } from "../Service/api.service";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  EmployeeModelobj !: EmployeeModel; 
  Employeedata:any ;
  firstName = "";
  lastName = "";
  emailID = "";
  designation = "";
  mobileNo = "";
  EmployeeId!:any;
  

  constructor(private api: ApiService) { }
  Addform = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    emailId: new FormControl(''),
    designation: new FormControl(''),
    mobileNo: new FormControl('')
  });

  ngOnInit(): void {
    this.getAllEmployee();
  }
  
  /* Method for Making Post Request */
  postEmployeeDetails() {
    this.firstName = this.Addform.value.firstName;
    this.lastName = this.Addform.value.lastName;
    this.emailID = this.Addform.value.emailId;
    this.designation = this.Addform.value.designation;
    this.mobileNo = this.Addform.value.mobileNo;
    this.EmployeeModelobj = new EmployeeModel(this.firstName,this.lastName,this.emailID,this.designation,this.mobileNo);
    this.api.createEmployee(this.EmployeeModelobj)
    .subscribe(res=>{
    alert("Data Added Successfully")
    this.Addform.reset();
    this.getAllEmployee();
      })
  }

  /* Method for Making Get Request */
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.Employeedata = res;
        console.log(this.Employeedata)
      })
  }

  /* Method for Making Delete Request */
  delEmployee(row: any) {
    this.api.deleteEmployee(row._id)
      .subscribe((res) => {
        alert("Data Deleted Successfully")
        this.getAllEmployee();
      })
  }

  /* Method for filling Modal form for Update Request*/
  onEdit(row:any){
    this.EmployeeId = row._id;
    this.Addform.controls['firstName'].setValue(row.firstName);
    this.Addform.controls['lastName'].setValue(row.lastName);
    this.Addform.controls['emailId'].setValue(row.emailId);
    this.Addform.controls['designation'].setValue(row.designation);
    this.Addform.controls['mobileNo'].setValue(row.mobileNo);
  }


  /* Method for Making Put Request */
   updateEmployeeDetails(){
    this.EmployeeModelobj.firstName = this.Addform.value.firstName;
    this.EmployeeModelobj.lastName = this.Addform.value.lastName;
    this.EmployeeModelobj.emailId = this.Addform.value.emailId;
    this.EmployeeModelobj.designation = this.Addform.value.designation;
    this.EmployeeModelobj.mobileNo = this.Addform.value.mobileNo;
    this.api.updateEmployee(this.EmployeeModelobj,this.EmployeeId)
    .subscribe((res)=>{
      alert("Data Updated Successfully");
      this.Addform.reset();
      this.getAllEmployee();
    })

  }

}
