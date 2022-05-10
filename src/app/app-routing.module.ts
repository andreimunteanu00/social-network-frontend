import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {HomeComponent} from "./home/home.component";
import {PostComponent} from "./post/post.component";
import {AuthGuard} from "./util/auth.guard";
import {ChangepassComponent} from "./auth/changepass/changepass.component";
import {UserComponent} from "./user/user.component";
import {UserResolver} from "./user/user.resolver";
import {GroupComponent} from "./group/group.component";
import {GroupResolver} from "./group/group.resolver";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "changepass",
    component: ChangepassComponent
  },
  {
    path: "user/:id",
    component: UserComponent,
    resolve: {
      user: UserResolver
    }
  },
  {
    path: "group",
    component: GroupComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "post",
    component: PostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "",
    component: HomeComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: HomeComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
