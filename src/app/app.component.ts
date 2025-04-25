import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';

@Component({
    selector: 'app-root',
    imports: [RouterModule, CommonModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}
