import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  projects:any;
  selected:any;
  
  projectDisplayIdx:any;

  taskData = [[
    {id:'1', name:'task1',desc:'desc1',status:0},
    {id:'2', name:'task2',desc:'desc2',status:1},
    {id:'3', name:'task3',desc:'desc3',status:2},
    {id:'4', name:'task4',desc:'desc4',status:1},
  ],
  [
    {id:'4', name:'task1',desc:'desc1',status:1},
    {id:'3', name:'task2',desc:'desc2',status:2},
    {id:'2', name:'task3',desc:'desc3',status:0},
    {id:'1', name:'task4',desc:'desc4',status:1},
  ]]


  
  taskDisplayedColumns: string[] = ['id','name','desc','status'];
  taskDataSource:any;
 


  constructor(private loginService:LoginService,private route:Router,private auth:AuthguardService) { }

  ngOnInit(): void {
    if(this.auth.getToken())
    {
      this.loginService.employeePing().subscribe(
        (response:any)=>{
          console.log("get response of ping")
          this.route.navigateByUrl("/employeeDashboard");
        },
        (error:any) => {
          console.log(error);
          this.route.navigateByUrl("/welcome")
        }
      )
    }

    
    this.taskDataSource = new MatTableDataSource<any>();
    this.taskDataSource.data = this.taskData[0];

    this.projects = [];
    let newProject = {
    name:"sfvfds",
    description:"dadcsdv",
    }
    this.projects.push(newProject);
    let newProject1 = {
      name:"sfvfds",
      description:"dadcsdvdfbd",
      }
    this.projects.push(newProject1);

    this.projectDisplayIdx=0;
    this.selected = "pro"+this.projectDisplayIdx;
    
    this.projectDisplay(0);
    console.log(this.projects)
  }

  projectDisplay(idx:any){ 
    this.taskDataSource.data = this.taskData[idx];
    console.log("project selectd" + idx);
    console.log(this.selected);
    this.projectDisplayIdx = idx
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "pro"+idx;
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black"; 
    
  }

}
