import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/auth/post.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  user: any = null
  username: any = ''
  postEditValue: any
  editImage = ''
  editContent = ''
  @Input() post = null
  @Input() i = null

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUserBehavioralSubject
      .subscribe((user: any) => {
        this.user = user
        // console.log(user)
        if (user) {
          this.username = user.username
        }
      })
  }

  submitEdit(editContent, editImage, id) {
    this.postService.updatePost(editContent, editImage, id, this.postEditValue)
    this.postEditValue = null
  }


  deletePost(id) {
    this.postService.deletePost(id)
  }

}
