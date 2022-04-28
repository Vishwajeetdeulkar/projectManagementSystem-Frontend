import { Component, ViewChild,OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  projects:any;
  selected:any;

  projectDetails = {
    name:'',
    description:'',
  }

  taskDetails = {
    name:'',
    desc:'',
    emp:{id:0,name:'',email:'',businessTitle:''}
  }

  effortDetails = {
    date:'',
    rah:0,
    dh:0,
    ch:0,
    th:0,
    pmh:0
  }

  editDetailsDisabled:any;
  editTeamDetailsDisabled:any;
  editTaskDetailsDisabled:any;
  editEffortDetailsDisabled:any;

  addProject:any;
  projectDisplayIdx:any;

  teamMember:any;
  task:any;
  effort:any;

  projectEmployeeData = [
    {id:1, name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
    {id:2, name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
    {id:3, name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
    {id:3, name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
  ]

  employeeData = [
    {id:1, name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
    {id:2, name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
    {id:3, name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
    {id:4, name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
  ]

  taskData = [
    {id:'1', name:'task1',desc:'desc1',status:0,emp:{id:1, name:'name1',email:'email1@gmail.com', businessTitle:"title1" }},
    {id:'2', name:'task2',desc:'desc2',status:1,emp:{id:2, name:'name2',email:'email1@gmail.com', businessTitle:"title2" }},
    {id:'3', name:'task3',desc:'desc3',status:2,emp:{id:3, name:'name3',email:'email1@gmail.com', businessTitle:"title3" } },
    {id:'4', name:'task4',desc:'desc4',status:1,emp:{id:4, name:'name4',email:'email1@gmail.com', businessTitle:"title4" } },
  ]

  // effortData = [
  //   {date:''}
  // ]



  teamDisplayedColumns: string[] = ['id', 'name','email', 'businessTitle',"remove"];
  teamDataSource:any;

  taskDisplayedColumns: string[] = ['id','name','desc','status','emp',"remove"];
  taskDataSource:any;

  addMember = new FormControl();
  assignEmployee = new FormControl();

  @ViewChild("chart") chart:ChartComponent;
  public chartOptions:any;
  // Partial<ChartOptions>;

  constructor(private loginService:LoginService,private route:Router,private auth:AuthguardService) { 
    
  }

  ngOnInit(): void {

  
    this.chartOptions = {
      series: [0,0,0,0,0],
      chart: {
        width: 500,
        type: "pie"
      },
      labels: ["Requirment Analysis", "Designing", "Coding", "Testing", "Project Management"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    
    this.teamDataSource = new MatTableDataSource<any>();
    this.teamDataSource.data = this.projectEmployeeData;

    this.taskDataSource = new MatTableDataSource<any>();
    this.taskDataSource.data = this.taskData;

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    if(this.auth.getToken())
    {
      this.loginService.managerPing().subscribe(
        (response:any)=>{
          console.log("get response of ping")
          this.route.navigateByUrl("/managerDashboard");
        },
        (error:any) => {
          console.log(error);
          this.route.navigateByUrl("/welcome");
        }
      )
    }

    this.selected = "addButton";
    this.addProjectDisplay();
    this.projects = [];

    
    let newProject = this.projectDetails;
    newProject.name="sfvfds";
    newProject.description="dadcsdv";
    this.projects.push(newProject);

  }

  addProjectDisplay(){
    this.addProject = true;
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "addButton";
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black";
  }

  projectDisplay(idx:any){ 
    this.teamMember = false;
    this.task = true;
    this.effort = true;

    this.addProject = false;
    this.projectDisplayIdx = idx
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "pro"+idx;
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black"; 
    this.editDetailsDisabled = true;
    this.editTeamDetailsDisabled = true;
    this.editTaskDetailsDisabled = true;
    this.editEffortDetailsDisabled = true;
    
  }

  showTeamMember(){
    this.teamMember = false;
    this.task = true;
    this.effort = true;
  }

  showTask(){
    console.log("in show task");
    this.teamMember = true;
    this.task = false;
    this.effort = true;
  }

  showEffort(){
    
    console.log("in show effort");
    this.teamMember = true;
    this.task = true;
    this.effort = false;
  }

  addProjectDetails(){
    let newProject = this.projectDetails;
    this.projects.push(newProject);
    console.log(this.projects);
    // this.reset()
  }

  editDescription(projectDisplayIdx:any){
    this.editDetailsDisabled = false;
  }

  saveDescription(projectDisplayIdx:any){
    this.editDetailsDisabled = true;
  }

  editTeam(projectDisplayIdx:any){
    this.editTeamDetailsDisabled = false;
  }

  saveTeam(projectDisplayIdx:any){
    this.editTeamDetailsDisabled = true;
  }

  editTask(projectDisplayIdx:any){
    this.editTaskDetailsDisabled = false;
  }
 
  saveTask(projectDisplayIdx:any){
    this.editTaskDetailsDisabled = true;
  }

  editEffort(projectDisplayIdx:any){
    this.editEffortDetailsDisabled = false;
  }

  saveEffort(projectDisplayIdx:any){
    this.editEffortDetailsDisabled = true;
  }

  addEmployee()
  {
    this.employeeData.forEach((elemnet,index)=>{
      if(this.addMember.value.includes(elemnet.id))
      {
        this.projectEmployeeData.push(elemnet);
        this.employeeData.splice(index,1);
      }
    });
    this.addMember.setValue(null);
    this.teamDataSource.data = this.projectEmployeeData;
    console.log(this.teamDataSource)
  }

  addTask()
  {
    console.log("add task");
    console.log(this.assignEmployee);
    console.log("after taask")
    if(this.taskDetails.name=='' || this.taskDetails.desc=='' || this.assignEmployee.value.id == '')
    {
      alert("plz enter details");
      return;
    }
    
    let task = {
      id:'10',
      name:this.taskDetails.name,
      desc:this.taskDetails.desc,
      status:0,
      emp:this.taskDetails.emp
    }
    this.taskData.push(task);
    this.taskDataSource.data = this.taskData;
    this.taskDetails.desc='';
    this.taskDetails.name='';
    this.assignEmployee.setValue(null);
    console.log(this.taskDataSource);
  }

  updateEffort(){
    this.chartOptions.series = [this.effortDetails.rah, this.effortDetails.dh, this.effortDetails.ch, this.effortDetails.th,this.effortDetails.pmh];

  }


  removeTask(id:any)
  {
    
    console.log("remove task");
    this.taskData.forEach((element,index)=>{
      if(element.id==id)
      {
        this.taskData.splice(index,1);
      }
    });
    
    this.taskDataSource.data = this.taskData;
    
    console.log(this.taskDataSource);
  }

  removeEmployee(id:any)
  {
    this.projectEmployeeData.forEach((element,index)=>{
      if(element.id == id)
      {
        this.employeeData.push(element);
        this.projectEmployeeData.splice(index,1);
      }
    });
    this.teamDataSource.data=this.projectEmployeeData;
  }
  reset(){
    this.projectDetails.name = '';
    this.projectDetails.description ='';
  }
}
