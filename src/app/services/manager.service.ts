import { HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  
  url = "http://localhost:8086";

  constructor(private router:Router,private http:HttpClient) { }


  addProject(projectDetails:any)
  {
    
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/manager/addProject`,projectDetails,{'headers':header});
  }

  updateProject(projectDetails:any)
  {
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/manager/updateProject`,projectDetails,{'headers':header}); 
  }

  removeProject(projectId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('projectId',projectId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/manager/removeProject`,{'headers':header,'params':params});
  }

  getProjectDetails()
  {
    let token = localStorage.getItem("SessionUser");
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/manager/getAllProject`,{'headers':header});
  }


  getFreeEmployeeForProject(projectId:any){
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('projectId',projectId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/manager/getFreeEmployee`,{'headers':header,'params':params});
  }

  addUserToProject(projectId:any,userId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let addUser = {
      projectId:projectId,
      userId:userId
    }
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/manager/addUserToProject`,addUser,{'headers':header}); 
  }

  removeUserFromProject(projectId:any,userId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('projectId',projectId);
    params = params.append('userId',userId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/manager/removeUserFromProject`,{'headers':header,'params':params});
  }

  addTaskToProject(projectId:any,taskDetails:any)
  {
    let token = localStorage.getItem("SessionUser");
    let addTask = {
      projectId:projectId,
      userId:taskDetails.emp,
      name:taskDetails.name,
      desc:taskDetails.desc
    }
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/manager/addTaskToProject`,addTask,{'headers':header}); 
  }

  removeTaskFromProject(projectId:any,taskId:any)
  {
    let token = localStorage.getItem("SessionUser");
    let params = new HttpParams();
    params = params.append('projectId',projectId);
    params = params.append('taskId',taskId);
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.get(`${this.url}/manager/removeTaskFromProject`,{'headers':header,'params':params}); 
  }

  updateEffortTable(projectId:any,effortTable:any)
  {
    let token = localStorage.getItem("SessionUser");
    console.log(effortTable)
    let updateEffort = {
      projectId:projectId,
      effortId:effortTable.id,
      date:effortTable.date,
      rah:effortTable.effortSeries[0],
      dh:effortTable.effortSeries[1],
      ch:effortTable.effortSeries[2],
      th:effortTable.effortSeries[3],
      pmh:effortTable.effortSeries[4],
    }
    console.log(updateEffort)
    let header = new HttpHeaders(
      {
        Authorization  : "Bearer " + token
      }
    );
    return this.http.post(`${this.url}/manager/updateEffortTable`,updateEffort,{'headers':header}); 
  }
}
