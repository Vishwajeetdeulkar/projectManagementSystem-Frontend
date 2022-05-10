import { Component, ViewChild,OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';
import {FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ChartComponent } from 'ng-apexcharts';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart } from "ng-apexcharts";
import { ManagerService } from 'src/app/services/manager.service';
import { MatSnackBar,  MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';



export interface userDetails {
  id:number,
  name:string,
  email:string,
  businessTitle:string
}

export interface projectDetailsInterface {
  name:string,
  description:string
}

export interface taskDetailsInterface {
  id:number,
  name:string,
  desc:string,
  status:number,
  emp:userDetails,
}

export interface effortTable {
  id:number,
  effortSeries:number[],
}


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

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  projects:any;
  selected:any;

  projectDetails:projectDetailsInterface = {
    name:'',
    description:'',
  }

  taskDetails = {
    name:'',
    desc:'',
    emp:0,
  }

  effortDetails = {
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

  projectEmployeeData:userDetails[][] = [];
  employeeData:userDetails[][] = [];
  taskData:taskDetailsInterface[][] = [];
  effortData:effortTable[] = [];
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

  constructor(private managerService:ManagerService, private loginService:LoginService,private route:Router,private auth:AuthguardService,private _snackBar: MatSnackBar) { 
    
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

    this.getProjectDetails();
    
   
  }

  getProjectDetails()
  {
    this.managerService.getProjectDetails().subscribe(
      (response:any) => {
        console.log(response);
        response.forEach((element:any)=>{  
          this.managerService.getFreeEmployeeForProject(element.id).subscribe(
            (response:any) => {
              // console.log(response);
              let freeEmployeeData:userDetails[] = [];
              response.forEach((freeEmployee:any) => {
                let userDetailsData = {
                  id:freeEmployee.id,
                  name:freeEmployee.name,
                  email:freeEmployee.email,
                  businessTitle:freeEmployee.businessTitle
                }
                freeEmployeeData.push(userDetailsData);
              })
              this.employeeData.push(freeEmployeeData);
            },
            (error:any) => {
              console.log(error);
            }
          );
          let pd = {
            id:element.id,
            name:element.projectname,
            description:element.description
          }
          this.projects.push(pd)
          console.log(this.projectEmployeeData);
          let projectEmployeeDetails:userDetails[] = [];
          element.users.forEach((employee:any) => {
            if(employee.roles[0].id==3){
              let userDetailsData = {
                id:employee.id,
                name:employee.name,
                email:employee.email,
                businessTitle:employee.businessTitle
              }
              projectEmployeeDetails.push(userDetailsData);
            }
          });
          console.log(projectEmployeeDetails);
          this.projectEmployeeData.push(projectEmployeeDetails);


          let projectTaskDetails:taskDetailsInterface[] = [];
          element.task.forEach((task:any) => {
            let userDetailsData = {
              id:task.user.id,
              name:task.user.name,
              email:task.user.email,
              businessTitle:task.user.businessTitle
            }
            let taskDetailsData = {
              id:task.id,
              name:task.taskname,
              desc:task.description,
              status:task.statusLu.id,
              emp:userDetailsData,
            }
            projectTaskDetails.push(taskDetailsData);
          })
          this.taskData.push(projectTaskDetails);
          console.log(this.taskData);

          let  effort:number[] = [];
          effort.push(element.effortTable.requirementAnalysisHours)
          effort.push(element.effortTable.designingHours)
          effort.push(element.effortTable.codingHours)
          effort.push(element.effortTable.testingHours)
          effort.push(element.effortTable.projectManagementHours)
          let effortDataDetails:effortTable = {
            id:element.effortTable.id,
            effortSeries:effort,
          }
          this.effortData.push(effortDataDetails);

        });
        
      },
      (error:any)=> {
        console.log(error);
      }
    );
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


    this.teamDataSource.data  = this.projectEmployeeData[this.projectDisplayIdx];
    this.taskDataSource.data  = this.taskData[this.projectDisplayIdx];
    this.chartOptions.series  = this.effortData[this.projectDisplayIdx].effortSeries;

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
    this.managerService.addProject(this.projectDetails).subscribe(
      (response:any)=>{
        console.log(response);
        this.projectEmployeeData = [];
        this.employeeData = [];
        this.taskData = [];
        this.effortData = [];
        this.projects = [];
        this.getProjectDetails();
        this._snackBar.open('New Project Created Successfully', 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => {
        console.log(error);
      }
    )
  }

  editDescription(projectDisplayIdx:any){
    this.editDetailsDisabled = false;
  }

  saveDescription(projectDisplayIdx:any){
    this.editDetailsDisabled = true;
    this.managerService.updateProject(this.projects[projectDisplayIdx]).subscribe(
      (response:any) => {
        
      },
      (error:any) => {

      }
    );
  }

  removeProject()
  {
    
      this.managerService.removeProject(this.projects[this.projectDisplayIdx].id).subscribe(
      (response:any) => {
        console.log(response);
        this.projects.splice(this.projectDisplayIdx,1);
        this.projectEmployeeData.splice(this.projectDisplayIdx,1);
        this.employeeData.splice(this.projectDisplayIdx,1);
        this.taskData.splice(this.projectDisplayIdx,1);
        this.effortData.splice(this.projectDisplayIdx,1);
        this.addProjectDisplay();
        this._snackBar.open("Project Deleted Successfully", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => { 
        this._snackBar.open(error, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2* 1000,
      });
      }
    );  
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

    let userIds:any = [];
    this.addMember.value.forEach((element:any) =>{
      userIds.push(element);
    })
    console.log(this.projectEmployeeData);
    this.managerService.addUserToProject(this.projects[this.projectDisplayIdx].id,userIds).subscribe(
      (response:any) =>{
        console.log(response);
        this.managerService.getFreeEmployeeForProject(response.id).subscribe(
          (response:any) => {
            // console.log(response);
            let freeEmployeeData:userDetails[] = [];
            response.forEach((freeEmployee:any) => {
              let userDetailsData = {
                id:freeEmployee.id,
                name:freeEmployee.name,
                email:freeEmployee.email,
                businessTitle:freeEmployee.businessTitle
              }
              freeEmployeeData.push(userDetailsData);
            })
            this.employeeData[this.projectDisplayIdx]=freeEmployeeData;
          },
          (error:any) => {
            console.log(error);
          }
        );
        let projectEmployeeDetails:userDetails[] = [];
        response.users.forEach((employee:any) => {
          if(employee.roles[0]==3){
          let userDetailsData = {
            id:employee.id,
            name:employee.name,
            email:employee.email,
            businessTitle:employee.businessTitle
          }
          projectEmployeeDetails.push(userDetailsData);
        }
        })
        this.projectEmployeeData[this.projectDisplayIdx]=projectEmployeeDetails;
        this.teamDataSource.data = projectEmployeeDetails;
        console.log(this.projectEmployeeData);
        this._snackBar.open("Employee added in project", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any)=>{
        this._snackBar.open(error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
     this.addMember.setValue(null);
    // this.teamDataSource.data = this.projectEmployeeData;
    // console.log(this.teamDataSource)
  }

  removeEmployee(id:any)
  {
    console.log(this.projectEmployeeData);
    this.managerService.removeUserFromProject(this.projects[this.projectDisplayIdx].id,id).subscribe(
      (response:any)=>{
        console.log(response);
        this.managerService.getFreeEmployeeForProject(response.id).subscribe(
          (response:any) => {
            // console.log(response);
            let freeEmployeeData:userDetails[] = [];
            response.forEach((freeEmployee:any) => {
              let userDetailsData = {
                id:freeEmployee.id,
                name:freeEmployee.name,
                email:freeEmployee.email,
                businessTitle:freeEmployee.businessTitle
              }
              freeEmployeeData.push(userDetailsData);
            })
            this.employeeData[this.projectDisplayIdx]=freeEmployeeData;
          },
          (error:any) => {
            console.log(error);
          }
        );
        let projectEmployeeDetails:userDetails[] = [];
        response.users.forEach((employee:any) => {
          if(employee.roles[0]==3){
          let userDetailsData = {
            id:employee.id,
            name:employee.name,
            email:employee.email,
            businessTitle:employee.businessTitle
          }
          projectEmployeeDetails.push(userDetailsData);
        }
        })
        this.projectEmployeeData[this.projectDisplayIdx]=projectEmployeeDetails;
        this.teamDataSource.data = projectEmployeeDetails;
        console.log(this.projectEmployeeData);
        this._snackBar.open("Employee remove from project", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any)=>{
        this._snackBar.open(error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    )
  }

  addTask()
  {
    if(this.taskDetails.name=='' || this.taskDetails.desc=='' || this.assignEmployee.value.id == '')
    {
      alert("plz enter details");
      return;
    }
    let task = {
      name:this.taskDetails.name,
      desc:this.taskDetails.desc,
      emp:this.taskDetails.emp
    }
    this.managerService.addTaskToProject(this.projects[this.projectDisplayIdx].id,task).subscribe(
      (response:any) => {
        console.log(response);
        let projectTaskDetails:taskDetailsInterface[] = [];
        response.task.forEach((task:any) => {
          let userDetailsData = {
            id:task.user.id,
            name:task.user.name,
            email:task.user.email,
            businessTitle:task.user.businessTitle
          }
          let taskDetailsData = {
            id:task.id,
            name:task.taskname,
            desc:task.description,
            status:task.statusLu.id,
            emp:userDetailsData,
          }
          projectTaskDetails.push(taskDetailsData);
        })
        this.taskData[this.projectDisplayIdx]=projectTaskDetails;
        this.taskDataSource.data = projectTaskDetails;
        console.log(this.taskData);
        this._snackBar.open("Task added in project", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => {
        this._snackBar.open(error, 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      }
    );
    this.taskDetails.desc='';
    this.taskDetails.name='';
    this.assignEmployee.setValue(null);
    console.log(this.taskDataSource);
  }

  removeTask(id:any)
  {
    this.managerService.removeTaskFromProject(this.projects[this.projectDisplayIdx].id,id).subscribe(
      (response:any) => {
        console.log(response);
        let projectTaskDetails:taskDetailsInterface[] = [];
        response.task.forEach((task:any) => {
          let userDetailsData = {
            id:task.user.id,
            name:task.user.name,
            email:task.user.email,
            businessTitle:task.user.businessTitle
          }
          let taskDetailsData = {
            id:task.id,
            name:task.taskname,
            desc:task.description,
            status:task.statusLu.id,
            emp:userDetailsData,
          }
          projectTaskDetails.push(taskDetailsData);
        })
        this.taskData[this.projectDisplayIdx]=projectTaskDetails;
        this.taskDataSource.data = projectTaskDetails;
        console.log(this.taskData);
        this._snackBar.open("Remove task from project", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => { 
        this._snackBar.open(error, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2* 1000,
      });
      }

    );
  }

  updateEffort(){
    this.managerService.updateEffortTable(this.projects[this.projectDisplayIdx].id,this.effortData[this.projectDisplayIdx]).subscribe(
      (response:any) => {
        console.log(response);
        let  effort:number[] = [];
        effort.push(response.effortTable.requirementAnalysisHours)
        effort.push(response.effortTable.designingHours)
        effort.push(response.effortTable.codingHours)
        effort.push(response.effortTable.testingHours)
        effort.push(response.effortTable.projectManagementHours)
        let effortDataDetails:effortTable = {
          id:response.effortTable.id,
          effortSeries:effort,
        }
        this.effortData[this.projectDisplayIdx] = effortDataDetails;
        this.chartOptions.series = effortDataDetails.effortSeries;
        this._snackBar.open("Update Project Effort Successfully", 'Close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 2* 1000,
        });
      },
      (error:any) => { 
        this._snackBar.open(error, 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: 2* 1000,
      });
      }

    );
  }


  

 
  reset(){
    this.projectDetails.name = '';
    this.projectDetails.description ='';
  }
}
