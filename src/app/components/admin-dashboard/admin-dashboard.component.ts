import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

export interface userDetails {
  id:number,
  name:string,
  email:string,
  businessTitle:string
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  newEmployeeData = {
    username:'',
    password:'',
    name:'',
    phone:'',
    businessTitle:''
  }


  newManagerData = {
    username:'',
    password:'',
    name:'',
    phone:'',
    businessTitle:''
  }


  employeeData:userDetails[] = [];

  managerData:userDetails[]= [];
  employeeDisplayedColumns: string[] = ['id', 'name','email', 'businessTitle',"delete"];
  employeeDataSource:any;

  managerDisplayedColumns: string[] =  ['id', 'name','email', 'businessTitle',"delete"];
  managerDataSource:any;

  addMember = new FormControl();
  assignEmployee = new FormControl();

  displayManager:any;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
  
    this.employeeDataSource = new MatTableDataSource<any>();
    this.managerDataSource = new MatTableDataSource<any>();

    this.getManagerData();
    this.getEmployeeData();
    this.displayManager = true;
  }

  getManagerData(){
    this.adminService.getManagerData().subscribe(
      (response:any) => {
        this.managerData = [];
        response.forEach(
          (element:any) => {
            let managerDetails = {
              id:element.id,
              name:element.name,
              email:element.email,
              businessTitle:element.businessTitle
            }
            this.managerData.push(managerDetails);
          }
        )
       
        this.managerDataSource.data = this.managerData;
        console.log(response);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  
  getEmployeeData(){
    this.adminService.getEmployeeData().subscribe(
      (response:any) => {
        console.log(response)
        this.employeeData = [];
        response.forEach(
          (element:any) => {
            let employeeDetails = {
              id:element.id,
              name:element.name,
              email:element.email,
              businessTitle:element.businessTitle
            }
            this.employeeData.push(employeeDetails);
          }
        )
        // this.displayManager = true;
        this.employeeDataSource.data = this.employeeData;
        console.log(response);
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  displayManagerData()
  {
    this.displayManager = true; 
    this.managerDataSource.data = this.managerData;
  }

  displayEmployeeData(){
    this.displayManager = false;
    this.employeeDataSource.data = this.employeeData;
  }

  addUser(type:any)
  {
    let email = '';
    let userData = {};
    if(type==0)
    {
      email = this.newManagerData.username + "@manager.org";
      userData = {
        username:this.newManagerData.username,
        email:email,
        password:this.newManagerData.password,
        name:this.newManagerData.name,
        phone:this.newManagerData.phone,
        businessTitle:this.newManagerData.businessTitle
      }
    
      
    }
    else{
      email = this.newEmployeeData.username + "@employee.org";
      userData = {
        username:this.newEmployeeData.username,
        email:email,
        password:this.newEmployeeData.password,
        name:this.newEmployeeData.name,
        phone:this.newEmployeeData.phone,
        businessTitle:this.newEmployeeData.businessTitle
      }
    }

    console.log(userData);
    this.adminService.addUser(userData).subscribe(
      (response:any) => {
        console.log(response);
        if(type==0){
          this.getManagerData();
        }
        else{
          this.getEmployeeData()
        }
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  deleteUser(id:any)
  {
    this.adminService.deleteUser(id).subscribe(
      (response:any) => {
        console.log(response);
        this.getManagerData();
        console.log("function cll")
        this.getEmployeeData();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  


}
