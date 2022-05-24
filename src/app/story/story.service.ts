import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Story} from "./story.model";

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  resourceUrl = 'http://localhost:8080/api/story';

  constructor(
    public http: HttpClient
  ) { }

  getStoryFeed() {
    return this.http.get(this.resourceUrl + '/feed', { observe: 'response' });
  }

  getStoryMedia(story: Story) {
    return this.http.get(this.resourceUrl + '/' + story.id + '/media', { observe: 'response' });
  }

  createStory(file: string) {
    return this.http.post(this.resourceUrl, { image: file }, { observe: 'response' });
  }
}
