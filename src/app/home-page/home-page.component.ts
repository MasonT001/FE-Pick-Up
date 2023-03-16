import { Component, OnInit } from '@angular/core';
import { PostService } from '../auth/post.service';
import { UserService } from '../auth/user.service';
import { Post } from '../shared/post-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private postService: PostService) { }
  user: any = null
  posts: Post[] = []
  postEditValue: any

  editImage = ''
  editContent = ''
  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
    .subscribe((user) => {
      this.user = user
      console.log(user)
    })

    this.postService.currentUserPostsBS.subscribe((posts) => {
      this.posts = posts
    })
    this.posts = this.postService.currentUserPosts
  }

  submitEdit(editContent: string, editImage: string, id) {
    console.log(editContent, editImage, id)
    this.postEditValue = null
  }

}
