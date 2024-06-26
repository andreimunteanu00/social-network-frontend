import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IconsModule, MDBRootModule, NavbarModule, WavesModule} from 'angular-bootstrap-md'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {PostComponent} from './post/post.component';
import {AuthInterceptorService} from "./util/auth.interceptor";
import {AuthGuard} from "./util/auth.guard";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {ErrorHandlerInterceptorService} from "./util/errorhandler.interceptor";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './util/navbar/navbar.component';
import {SignupComponent} from './auth/signup/signup.component';
import {ChangepassComponent} from './auth/changepass/changepass.component';
import {SidenavbarComponent} from './util/sidenavbar/sidenavbar.component';
import {UserComponent} from './user/user.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {DiscoverComponent} from './group/discover/discover.component';
import {GroupComponent} from './group/group/group.component';
import {MygroupComponent} from './group/mygroup/mygroup.component';
import {ChatComponent} from './chat/chat.component';
import {RoomComponent} from './chat/room/room.component';
import {GroupfeedComponent} from './group/groupfeed/groupfeed.component';
import {AutosizeModule} from "ngx-autosize";
import { CommentComponent } from './comment/comment.component';

//import { BackgroundimageComponent } from './backgroundimage/backgroundimage.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    NavbarComponent,
    SignupComponent,
    ChangepassComponent,
    SidenavbarComponent,
    UserComponent,
    DiscoverComponent,
    GroupComponent,
    MygroupComponent,
    ChatComponent,
    RoomComponent,
    GroupfeedComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    IconsModule,
    NavbarModule,
    MDBRootModule,
    WavesModule,
    ImageCropperModule,
    FormsModule,
    AutosizeModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthGuard,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
