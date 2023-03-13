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
  postArray: Object[] = []
  displayVal = ''
  imageVal = ''
  post = this.imageVal + this.displayVal
  newPost = document.createElement('div')
  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
  }

  createPost(val: string, imageVal: string) {
    this.displayVal = val
    this.imageVal = imageVal
    this.postArray.push(this.post)
    const newPost = document.createElement("div");
    const newContent = document.createTextNode(val);
    newPost.appendChild(newContent);
    const currentDiv = document.getElementById("div1");
    console.log(this.postArray)
  }


}
