import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { PostService } from '../auth/post.service';
import { Post } from '../shared/post-model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  posts: Post[] = []
  inputValue: any;
  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
  }

  createPost(post: any) {
    this.postService.onCreatePost(post)
  }

  handleInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    console.log(this.inputValue)
  }

}
