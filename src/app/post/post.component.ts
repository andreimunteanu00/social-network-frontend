import {Component, HostListener, OnInit} from '@angular/core';
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
  posts!: Post[] | undefined;
  done!: boolean;
  busy: boolean = false;

  constructor(
    protected postService: PostService,
    protected userService: UserService
  ) { }

  ngOnInit(): void {
    this.posts = [];

    this.userService.getFeed(-1).subscribe((res: any) => {
      this.posts = res.body;
      // @ts-ignore
      this.done = this.posts?.length < 10;
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

  unlikePost(post: Post): void {
    if (!post.alreadyLiked) {
      return;
    }

    this.postService.unlike(post).subscribe((res: any) => {
      post.likeCount--;
      post.alreadyLiked = false;
    })
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (!this.done && !this.busy) {
      const triggerAt: number = 128;
      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= triggerAt) {
        this.busy = true;

        // @ts-ignore
        let lastIndex = this.posts[this.posts?.length - 1].id;

        this.userService.getFeed(lastIndex).subscribe((res: any) => {
          let newPosts = res.body;
          this.posts = this.posts?.concat(newPosts);
          this.done = newPosts.length < 10;

          this.busy = false;
        });
      }
    }
  }
}
