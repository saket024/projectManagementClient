import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { AuthService } from '../../services/auth.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.page.html',
  styleUrls: ['./single-task.page.scss'],
})
export class SingleTaskPage implements OnInit {

  constructor(private authService: AuthService, private location: Location) { }
  singleTask: any;
  singleTaskId: any
  newComment: any;
  commentResult: Observable<any>;
  commentList: any = [];
  getcommentResult: Observable<any>;
  getcommentList: any = [];
  commentDetails: any;
  progress: any;
  isAdmin: boolean;

  ngOnInit() {
    this.singleTask = this.authService.singleTask;
    // console.log(this.singleTask._id)
    this.singleTaskId = this.singleTask._id
    this.progress = this.singleTask.progress
    // console.log(this.singleTaskId)
    this.getComment(this.singleTaskId)
    this.isAdmin = this.authService.isAdmin
    // console.log(this.isAdmin)
  }

  goBack() {
    this.location.back();
  }

  addComment(item1) {
    // console.log(item1)
    // console.log(item2)
    this.commentDetails = {
      comment: item1,
      taskId: this.singleTaskId
    }
    // console.log(this.commentDetails)
    this.commentResult = this.authService.addComment(this.commentDetails)
    this.commentResult.subscribe((res) => {
      // console.log(res)
      this.commentList = res
      // console.log(this.commentList)
    })
    this.getComment(this.singleTaskId);
    // this.authService.sendComment(this.commentDetails);
  }

  getComment(taskId) {
    this.getcommentResult = this.authService.getComments(this.singleTaskId)
    this.getcommentResult.subscribe((res) => {
      // console.log(res.comment)
      this.getcommentList = res.comment
      // console.log(this.progress)
    })
  }

  update() {
    let progressDet = {
      progress: this.progress,
      taskId: this.singleTaskId
    }
    // console.log(this.progress, this.singleTaskId)
    this.authService.setProgress(progressDet).subscribe();
    this.ngOnInit()
    this.location.back();
  }

}


