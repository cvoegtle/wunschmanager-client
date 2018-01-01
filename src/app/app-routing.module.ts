import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from "./edit/edit.component";
import { LoginComponent } from "./login/login.component";
import { ViewComponent } from "./view/view.component";
import { ShareComponent } from "./shared/shared.component";


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'share/:id', component: ShareComponent },
  { path: 'edit', component: EditComponent },
  { path: 'view', component: ViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}