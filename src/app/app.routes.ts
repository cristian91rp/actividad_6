import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { NavigationPageComponent } from './components/navigation-page/navigation-page.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo: ""},
    {path: "", component: HomeComponent},
    {path: 'page/:', component: NavigationPageComponent},
    {path: 'newuser', component: FormUserComponent},
    {path: 'user/:_id', component: ViewUserComponent},
    {path: 'user/update/:_id', component: FormUserComponent},
    {path: '**', redirectTo: ""},
];

