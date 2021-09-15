import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { RegisterUserComponent } from './admin/register-admin/register-user.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { ListTaskComponent } from './task/list-task/list-task.component';
import { SaveTaskComponent } from './task/save-task/save-task.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { IndexComponent } from "./home/index/index.component";
import { ListPanelComponent } from "./panel/list-panel/list-panel.component";
import { SavePanelComponent } from "./panel/save-panel/save-panel.component";
import { ProfileComponent } from "./home/profile/profile.component";
import { SaveProjectComponent } from "./project/save-project/save-project.component";



import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'listPanel',
    component: ListPanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'myProfile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'savePanel',
    component: SavePanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saveProyect',
    component: SaveProjectComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listTask/:id',
    component: ListTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'saveTask/:id',
    component: SaveTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signUp',
    component: RegisterComponent,
  },
  {
    path: 'listUser',
    component: ListUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registerUser',
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registerAdmin',
    component: RegisterUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateUser/:_id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registerRole',
    component: RegisterRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listRole',
    component: ListRoleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'updateRole/:_id',
    component: UpdateRoleComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
