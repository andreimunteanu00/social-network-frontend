import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "../post/post.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  resourceUrl = 'http://localhost:8080/api/comment';

  constructor(
    public http: HttpClient
  ) { }

  commentOnPost(post: Post, commentText: string) {
      return this.http.post(this.resourceUrl + '/' + post.id, {text: commentText}, { observe: 'response' });
  }
}
