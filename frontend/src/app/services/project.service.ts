import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerProject(project: any) {
    return this._http.post<any>(this.env + 'project/registerProject/', project);
  }

  listProjectUser() {
    return this._http.get<any>(this.env + 'project/listProjectUser');
  }

  listProjectUserP() {
    return this._http.get<any>(this.env + 'project/listProjectUserP');
  }

  shareProjectUser(project: any) {
    return this._http.put<any>(this.env + 'project/shareProjectUser', project);
  }

  deleteUserProject(project: any) {
    return this._http.delete<any>(this.env + 'project/deleteUserProject/' + project._id);
  }

}
