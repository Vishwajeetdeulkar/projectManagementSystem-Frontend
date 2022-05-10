import { HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = environment.apiURL;


  constructor(private router:Router,private http:HttpClient) { }

  getAllProjects()
  {
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/employee/getAllProjects`,{'headers':header});
  }

  getTaskByProject(projectId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('projectId',projectId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/employee/getTaskByProject`,{'headers':header,'params':params});
  }

  updateTaskStatus(projectId:any,taskId:any,statusId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let updateTask = {
      projectId:projectId,
      taskId:taskId,
      statusId:statusId,
    }
    console.log(updateTask)
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/employee/updateTaskStatus`,updateTask,{'headers':header});
  }
}
