import {Component, HostListener, OnInit} from '@angular/core';
import {Post} from "./post.model";
import {Comment} from "../comment/comment.model";
import {UserService} from "../user/user.service";
import {PostService} from "./post.service";
import {CommentService} from "../comment/comment.service";
import {HttpStatusCode} from "@angular/common/http";
import {Story} from "../story/story.model";
import {StoryService} from "../story/story.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts!: Post[];
  stories!: Story[];
  done!: boolean;
  busy: boolean = false;

  modalImage!: Story;

  commentText!: string;
  file!: string;

  constructor(
    protected postService: PostService,
    protected storyService: StoryService,
    protected userService: UserService,
    protected commentService: CommentService,
    protected modalService: NgbModal,
    protected formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.posts = [];

    this.userService.getFeed(-1).subscribe((res: any) => {
      this.posts = res.body;
      this.done = this.posts.length < 10;
      this.posts.forEach(p => p.commentIsHidden = true);
    })

    this.storyService.getStoryFeed().subscribe((res: any) => {
      this.stories = res.body;
    });
  }

  getStory(storyModal: any, story: Story) {
    this.storyService.getStoryMedia(story).subscribe((res: any) => {
      story.media = res.body.media;
      this.modalImage = story;
      this.openModal(storyModal);
    });
  }

  openModal(modalContent: any) {
    this.modalService.open(modalContent, {
      centered: true,
      scrollable: false
    });
  }

  createStoryPopUp(newStoryModal: any) {
    this.modalService.open(newStoryModal, {
      centered: true,
      scrollable: false
    })
  }

  createStory() {
    this.storyService.createStory(this.file).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Created) {
        Swal.fire({
          title: 'Success'
        });
      } else {
        Swal.fire({
          title: 'Error'
        })
      }

      this.modalService.dismissAll();
    });
  }

  likePost(post: Post): void {
    if (post.alreadyLiked) {
      return;
    }

    this.postService.like(post).subscribe(() => {
      post.likeCount!++;
      post.alreadyLiked = true;
    });
  }

  unlikePost(post: Post): void {
    if (!post.alreadyLiked) {
      return;
    }

    this.postService.unlike(post).subscribe(() => {
      post.likeCount!--;
      post.alreadyLiked = false;
    })
  }

  postComment(post: Post): void {
    this.commentService.commentOnPost(post, this.commentText).subscribe((res: any) => {
      if (res.status == HttpStatusCode.Created) {
        post.comments!.push(res.body.comment);
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

        this.userService.getFeed(lastIndex!).subscribe((res: any) => {
          let newPosts: Post[] = res.body;
          newPosts.forEach(p => p.commentIsHidden = true);
          this.posts = this.posts.concat(newPosts);
          this.done = newPosts.length < 10;

          this.busy = false;
        });
      }
    }
  }

  onChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        this.file = reader.result;
      }
    }
  }
}
