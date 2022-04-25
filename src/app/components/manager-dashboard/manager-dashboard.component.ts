import { Component, OnInit } from '@angular/core';

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

  addProject:any;
  projectDisplayIdx:any;
  constructor() { }

  ngOnInit(): void {
    this.selected = "addButton";
    this.addProjectDisplay();
    this.projects = [];

    this.projects.push("Peoject 1");
    this.projects.push("Peoject 2");
    this.projects.push("Peoject 3");
    this.projects.push("Peoject 4");
    this.projects.push("Peoject 5");
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
    this.addProject = false;
    this.projectDisplayIdx = idx
    let div: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    div.style.background =  "none";
    div.style.color = "white";
    this.selected = "pro"+idx;
    let newDiv: HTMLElement = document.getElementById(this.selected) as HTMLElement;
    newDiv.style.background =  "#ebe5f0";
    newDiv.style.color = "black";
  }

  addProjectDetails(){

  }
  reset(){
    this.projectDetails.name = '';
    this.projectDetails.description ='';
  }
}
