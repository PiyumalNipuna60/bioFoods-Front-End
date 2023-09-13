import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
//  {path: '', component: HomePageComponent},

 { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  { path: 'login', component: LoginPageComponent},
  { path: '/home', component: HomePageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
