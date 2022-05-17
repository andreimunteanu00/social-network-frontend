import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {Post} from "./post.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  resourceUrl = 'http://localhost:8080/api/post';

  constructor(
    public http: HttpClient
  ) { }

  like(post: Post) {
    return this.http.put(this.resourceUrl + '/' + post.id, { observe: 'response' });
  }
}
