import {Component, HostListener, Input, OnInit} from '@angular/core';
import {GroupService} from "../group.service";
import {Post} from "../../post/post.model";
import {PostService} from "../../post/post.service";

@Component({
  selector: 'app-groupfeed',
  templateUrl: './groupfeed.component.html',
  styleUrls: ['./groupfeed.component.scss']
})
export class GroupfeedComponent implements OnInit {
  posts!: Post[];
  done!: boolean;
  busy!: boolean;
  @Input() groupId!: number;

  constructor(
    private groupService: GroupService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.groupService.getGroupFeed(this.groupId, -1).subscribe((res: any) => {
      this.posts = res.body;
      this.done = this.posts.length < 10;
    });
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

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (!this.done && !this.busy) {
      const triggerAt: number = 128;
      if (document.body.scrollHeight - (window.innerHeight + window.scrollY) <= triggerAt) {
        this.busy = true;

        let lastIndex = this.posts[this.posts.length - 1].id;

        this.groupService.getGroupFeed(this.groupId, lastIndex).subscribe((res: any) => {
          let newPosts = res.body;
          this.posts = this.posts.concat(newPosts);
          this.done = newPosts.length < 10;

          this.busy = false;
        });
      }
    }
  }

}
