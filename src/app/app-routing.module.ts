import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from "./overview/edit.component";
import { LoginComponent } from "./login/login.component";
import { ViewComponent } from "./view/view.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}