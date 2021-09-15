import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private env: string;

  constructor(private _http: HttpClient) {
    this.env = environment.APP_URL;
  }

  registerPanel(panel: any) {
    return this._http.post<any>(this.env + 'panel/registerPanel', panel);
  }

  listPanel() {
    return this._http.get<any>(this.env + 'panel/listPanel');
  }

  updatePanel(panel: any) {
    return this._http.put<any>(this.env + 'panel/updatePanel', panel);
  }

  deletePanel(panel: any) {
    return this._http.delete<any>(this.env + 'panel/deletePanel/' + panel._id);
  }
  listPanel2(panelId: any) {
    return this._http.get<any>(this.env + 'panel/listPanel2/'+panelId);
  }
  
}
