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
import {DiscoverComponent} from "./group/discover/discover.component";
import {GroupResolver} from "./group/group.resolver";
import {GroupComponent} from "./group/group/group.component";
import {MygroupComponent} from "./group/mygroup/mygroup.component";
import {ChatComponent} from "./chat/chat.component";
import {RoomComponent} from "./chat/room/room.component";
import {ChatResolver} from "./chat/chat.resolver";

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
    path: "chats",
    component: ChatComponent,
    resolve: {
      chat: ChatResolver
    }
  },
  {
    path: "chats/:id",
    component: RoomComponent,
    resolve: {
      chat: ChatResolver
    }
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
    path: "discover",
    component: DiscoverComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "groups",
    component: GroupComponent,
    resolve: {
      user: GroupResolver
    }
  },
  {
    path: "mygroup/:id",
    component: MygroupComponent,
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
