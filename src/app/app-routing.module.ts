import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { FriendGraphComponent} from './friend-graph/friend-graph.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'addUser', pathMatch: 'full'},
  {path: 'addUser', component: AddUserComponent},
  {path: 'userList', component: UserListComponent},
  {path: 'friendGraph', component: FriendGraphComponent},
  {path: 'dashboard', component: DashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
