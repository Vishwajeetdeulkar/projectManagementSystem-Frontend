import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthguardService } from 'src/app/services/authguard.service';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  projects:any;
  selected:any;

  projectDetails = {
    id:'',
    name:'',
    description:'',
  }

  editDetailsDesabled:any;

  addProject:any;
  projectDisplayIdx:any;

  teamMember:any;
  task:any;
  effort:any;

  displayedColumns: string[] = ['id', 'name','email', 'businessTitle'];
  dataSource:any;
  constructor(private loginService:LoginService,private route:Router,private auth:AuthguardService) { }

  ngOnInit(): void {

    this.dataSource = [
      {id:'1', name:'name1',email:'email1@gmail.com', businessTitle:"title1" },
      {id:'2', name:'name2',email:'email1@gmail.com', businessTitle:"title2" },
      {id:'3', name:'name3',email:'email1@gmail.com', businessTitle:"title3" },
      {id:'4', name:'name4',email:'email1@gmail.com', businessTitle:"title4" },
    ]
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
    // window.location.reload();
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
    this.editDetailsDesabled = true;
  }

  showTeamMember(){
    this.teamMember = false;
    this.task = true;
    this.effort = true;
  }

  showTask(){
    this.teamMember = true;
    this.task = false;
    this.effort = true;
  }

  showEffort(){
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
    this.editDetailsDesabled = false;
  }

  saveDescription(projectDisplayIdx:any){
    this.editDetailsDesabled = true;
  }
  reset(){
    this.projectDetails.name = '';
    this.projectDetails.description ='';
  }
}
