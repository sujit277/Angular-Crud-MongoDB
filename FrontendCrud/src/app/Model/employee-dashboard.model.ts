export class EmployeeModel {
  firstName!: string;
  lastName!: string;
  emailId!: string;
  designation!: string;
  mobileNo!: string;

  constructor(
    firstName: string,
    lastName: string,
    emailID: string,
    designation: string,
    mobileNo: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailId = emailID;
    this.designation = designation;
    this.mobileNo = mobileNo;
  }
}
