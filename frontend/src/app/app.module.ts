import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { FooterComponent } from './home/footer/footer.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterUserComponent } from './admin/register-admin/register-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { GraphComponent } from "./task/graph/graph.component";

//servicios
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { TaskService } from './services/task.service';
import { PanelService } from './services/panel.service';
import { ProjectService } from './services/project.service';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IndexComponent } from './home/index/index.component';
import { ListPanelComponent } from './panel/list-panel/list-panel.component';
import { SavePanelComponent } from './panel/save-panel/save-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './home/profile/profile.component';
import { SaveProjectComponent } from './project/save-project/save-project.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdatePanelComponent } from './panel/update-panel/update-panel.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';

import { UpdateUser2Component } from './profile/update-user2/update-user2.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import * as moment from 'moment';
import { CalendarComponent } from './task/calendar/calendar.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { HeaderdosComponent } from './home/headerdos/headerdos.component';
import { HeadertresComponent } from './home/headertres/headertres.component';
import { HeadercuatroComponent } from './home/headercuatro/headercuatro.component';
import { DescriptionComponent } from './home/description/description.component';
import { ResumenComponent } from './home/resumen/resumen.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { InformationComponent } from './information/information.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ListTaskComponent,
    SaveTaskComponent,
    ListUserComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
    IndexComponent,
    ListPanelComponent,
    SavePanelComponent,
    ProfileComponent,
    SaveProjectComponent,
    HeadercuatroComponent,
    UpdatePanelComponent,
    UpdateTaskComponent,
    DescriptionComponent,
    UpdateUser2Component,
      CalendarComponent,
      HeaderdosComponent,
      HeadertresComponent,
      ResumenComponent,
      GraphComponent,
      InformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    DragDropModule,
    MatAutocompleteModule,
    MatDialogModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatSidenavModule,
  ],
  providers: [
    UserService,
    RoleService,
    TaskService,
    PanelService,
    ProjectService,
    TokenInterceptorService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
