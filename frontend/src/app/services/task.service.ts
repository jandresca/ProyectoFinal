import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }
  getTask (): any{
    return this._http.get(this.env+ "task/listTask");
  }
  updateTask (data : any): any{
    return this._http.put(this.env+ "task/updateTask", data);
  }

  deleteTask (data: any): any{
    return this._http.delete(this.env+ "task/deleteTask/"+data._id);

  }
  listTask(_id: any) {
    return this._http.get<any>(this.env + 'task/listTask/' + _id);
  }
}


