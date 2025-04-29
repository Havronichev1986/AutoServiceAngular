import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PageOfServicesComponent } from './page-of-services/page-of-services.component';
import { OrderFormComponent } from './order/order.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'page-of-services', component:PageOfServicesComponent},
  { path: 'order' , component:OrderFormComponent},
];
