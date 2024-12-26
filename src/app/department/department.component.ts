import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  department: any = [];
  modalTitle = "";
  DepartmentId = 0;
  DepartmentName = "";
  message ="";
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.http.get<any>(environment.API_URL + 'department').subscribe(data => {
      this.department = data;
    });
  }

  addDepart() {
    this.modalTitle = "Add Department";
    this.DepartmentId = 0;
    this.DepartmentName = "";
  }

  editDepart(dep: { DepartmentId: number; DepartmentName: string; }) {
    this.modalTitle = "Edit Department";
    this.DepartmentId = dep.DepartmentId;
    this.DepartmentName = dep.DepartmentName;
  }

  deleteDepart(id:any) {
    if(confirm('Are you sure ?')){
      this.http.delete(environment.API_URL+'department/'+id).subscribe(res=>{
        this.message=res.toString();
        setTimeout(() => {this.message=""},2000);
        this.refreshList();
      })
    }
  }

  createDepart(){
    var val={DepartmentName:this.DepartmentName};
    this.http.post(environment.API_URL+'department',val).subscribe(res=>{
      this.message=res.toString();
      setTimeout(() => {this.message=""},2000);
      this.refreshList();
    })
  }

  updateDepart(){
    var val={
      DepartmentId:this.DepartmentId,
      DepartmentName:this.DepartmentName
    };
    this.http.put(environment.API_URL+'department',val).subscribe(res=>{
      this.message=res.toString();
      setTimeout(() => {this.message=""},2000);
      this.refreshList();
    })
  }
}
