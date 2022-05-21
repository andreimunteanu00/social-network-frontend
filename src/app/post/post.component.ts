import {Component, HostListener, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {UserService} from "../user/user.service";
import {PostService} from "./post.service";
import {CommentService} from "../comment/comment.service";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts!: Post[];
  done!: boolean;
  busy: boolean = false;

  commentText!: string;

  constructor(
    protected postService: PostService,
    protected userService: UserService,
    protected commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.posts = [];

    this.userService.getFeed(-1).subscribe((res: any) => {
      this.posts = res.body;
      this.done = this.posts.length < 10;
      this.posts.forEach(p => p.commentIsHidden = true);
    })
  }

  likePost(post: Post): void {
    if (post.alreadyLiked) {
      return;
    }

    this.postService.like(post).subscribe(() => {
      post.likeCount++;
      post.alreadyLiked = true;
    });
  }

  unlikePost(post: Post): void {
    if (!post.alreadyLiked) {
      return;
    }

    this.postService.unlike(post).subscribe(() => {
      post.likeCount--;
      post.alreadyLiked = false;
    })
  }

  postComment(post: Post): void {
    this.commentService.commentOnPost(post, this.commentText).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Created) {
        post.comments.push(res.body.comment);
      }
    });
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (!this.done && !this.busy) {
      const triggerAt: number = 128;

      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= triggerAt) {
        this.busy = true;

        let lastIndex = this.posts[this.posts.length - 1].id;

        this.userService.getFeed(lastIndex).subscribe((res: any) => {
          let newPosts: Post[] = res.body;
          newPosts.forEach(p => p.commentIsHidden = true);
          this.posts = this.posts.concat(newPosts);
          this.done = newPosts.length < 10;

          this.busy = false;
        });
      }
    }
  }
}
