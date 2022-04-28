import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { elementAt } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

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


  employeeData = [
    {id:1, name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
    {id:2, name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
    {id:3, name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
    {id:4, name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
    {id:5, name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
    {id:6, name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
    {id:7, name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
    {id:8, name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
  ]

  managerData = [
    {id:1, name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
    {id:2, name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
    {id:3, name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
    {id:4, name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
  ]

  employeeDisplayedColumns: string[] = ['id', 'name','email', 'businessTitle',"delete"];
  employeeDataSource:any;

  managerDisplayedColumns: string[] =  ['id', 'name','email', 'businessTitle',"delete"];
  managerDataSource:any;

  addMember = new FormControl();
  assignEmployee = new FormControl();

  displayManager:any;

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    this.employeeDataSource = new MatTableDataSource<any>();
    this.managerDataSource = new MatTableDataSource<any>();
    this.displayManagerData();
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
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  deleteManager(id:any)
  {
    this.managerData.forEach((element,index)=>{
      if(element.id==id)
      {
        this.managerData.splice(index,1);
      }
    })
    this.managerDataSource.data = this.managerData;
  }

  
  deleteEmployee(id:any)
  {
    this.employeeData.forEach((element,index)=>{
      if(element.id==id)
      {
        this.employeeData.splice(index,1);
      }
    })
    this.employeeDataSource.data = this.employeeData;
  }


}
