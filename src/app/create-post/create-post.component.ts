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
  displayVal = ''
  imageVal = ''

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
  }

  createPost(val: string, imageVal: string) {
    this.displayVal = val
    this.imageVal = imageVal
    this.postService.addPost(new Post(imageVal, val, 1))
  }

}
