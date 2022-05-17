import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Post} from "./post.model";
import {UserService} from "../user/user.service";
import {PostService} from "./post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts: Post[] | undefined;

  constructor(
    protected jwtHelper: JwtHelperService,
    protected postService: PostService,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getFeed(0).subscribe((res: any) => {
      this.posts = res.body;
    })
  }

  likePost(post: Post): void {
    if (post.alreadyLiked) {
      return;
    }

    this.postService.like(post).subscribe((res: any) => {
      post.likeCount++;
      post.alreadyLiked = true;
    });

  }
}
