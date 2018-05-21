import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user/profile/user-profile/user-profile.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { GooglemapComponent } from './components/googlemap/googlemap.component';
import { HouseComponent } from './components/user/house/house.component';
import { EditHouseComponent } from './components/user/house/edit-house/edit-house.component';
import { AddHouseComponent } from './components/user/house/add-house/add-house.component';
import { RoomComponent } from './components/user/house/room/room.component';
import { AddRoomComponent } from './components/user/house/room/add-room/add-room.component';
import { AddPostComponent } from './components/user/post/add-post/add-post.component';
import { ChangePasswordComponent } from './components/user/profile/change-password/change-password.component';
import { UpdateInfoComponent } from './components/user/profile/update-info/update-info.component';
import { PostManagerComponent } from './components/user/post/post-manager/post-manager.component';
import { PostDetailComponent } from './components/user/post/post-detail/post-detail.component';

// import guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AdminGuard } from './guards/admin.guard';

// import services
import { AgmService } from './services/agm.service';
import { UserService } from './services/user.service';
import { UtilitiesService } from './services/utilities.service';
import { UploadFileService } from './services/upload-file.service';
import { AuthService } from './services/auth.service';
import { HouseService } from './services/house.service';
import { RoomService } from './services/room.service';
import { PostService } from './services/post.service';

import {GrowlModule} from 'primeng/growl';
import { RoomPostComponent } from './components/user/post/room-post/room-post.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserProfileComponent,
    AdminDashboardComponent,
    GooglemapComponent,
    HouseComponent,
    EditHouseComponent,
    AddHouseComponent,
    RoomComponent,
    AddRoomComponent,
    AddPostComponent,
    ChangePasswordComponent,
    UpdateInfoComponent,
    PostManagerComponent,
    PostDetailComponent,
    RoomPostComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    GrowlModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIOJzNMhrwsDp26nrtYfVO9gw40VsMaRI'
    })
  ],
  providers: [AuthGuard, NotAuthGuard, AdminGuard,
     UtilitiesService, UploadFileService, AgmService, UserService, AuthService, HouseService, RoomService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
