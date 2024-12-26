import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee: any = [];
  DepartList:String[]=[];
  modalTitle = "";
  EmployeeId = 0;
  EmployeeName = "";
  Departments = "";
  DateOfJoining ="";
  photoFileName ="";
  message ="";
  
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.refreshList();
    this.departList();
  }
  refreshList() {
    this.http.get<any>(environment.API_URL + 'employee').subscribe(data => {
      this.employee = data;
    });
  }

  departList() {
    this.http.get<any>(environment.API_URL + 'department').subscribe(data => {
      JSON.stringify(data);
      for(let index in data){
      this.DepartList.push(data[index].DepartmentName);
      }
    });
  }

  
  addEmp() {
    this.modalTitle = "Add Employee";
    this.EmployeeId = 0;
    this.EmployeeName = "";
    this.Departments = "";
    this.DateOfJoining ="";
    this.photoFileName ="";
  }

  editEmp(emp: { EmployeeId: number; EmployeeName: string; Departments: string; DateOfJoining: string; photoFileName: string; }) {
    this.modalTitle = "Edit Employee";
    this.EmployeeId = emp.EmployeeId;
    this.EmployeeName = emp.EmployeeName;
    this.Departments = emp.Departments;
    this.DateOfJoining =emp.DateOfJoining;
    this.photoFileName =emp.photoFileName;
  }

  deleteEmp(id:any) {
    if(confirm('Are you sure ?')){
      this.http.delete(environment.API_URL+'employee/'+id).subscribe(res=>{
        this.message=res.toString();
        setTimeout(() => {this.message=""},2000);
        this.refreshList();
      })
    }
  }

  createEmp(){
    var val={
      EmployeeName:this.EmployeeName,
      Departments:this.Departments,
      DateOfJoining:this.DateOfJoining,
      photoFileName:this.photoFileName
    };
    this.http.post(environment.API_URL+'employee',val).subscribe(res=>{
      this.message=res.toString();
      setTimeout(() => {this.message=""},2000);
      this.refreshList();
    })
  }

  updateEmp(){
    var val={
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Departments:this.Departments,
      DateOfJoining:this.DateOfJoining,
      photoFileName:this.photoFileName
    };
    this.http.put(environment.API_URL+'employee',val).subscribe(res=>{
      this.message=res.toString();
      setTimeout(() => {this.message=""},2000);
      this.refreshList();
    })
  }

}
