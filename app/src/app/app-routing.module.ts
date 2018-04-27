import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { HouseComponent } from './components/user/house/house.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'googlemap',
        component: GooglemapComponent
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NotAuthGuard]
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: UserProfileComponent
            },
            {
                path: 'house',
                component: HouseComponent
            }
        ]
    },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        children: [
            {
                path: '',
                component: AdminDashboardComponent
            }
        ]
    },
    { path: '**',
    component: HomeComponent } // "Catch-All" Route
];

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [],
    exports: [RouterModule]
})
export class AppRoutingModule { }
