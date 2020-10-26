import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
formatDate(new Date(), 'yyyy/MM/dd', 'en');
@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {
  user: any;
  userId: any;
  getMyTaskResult: Observable<any>;
  getMyTaskList: any = [];
  myProfile: any = [];
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  content: any;


  constructor(private authService: AuthService) {
    this.uerDet();
    this.getMyTasks(this.userId);
    // console.log("initialized constructor")
    // console.log(this.myDate)
  }

  ngOnInit() {
    this.getMyTasks(this.userId);
    // console.log("initialized ngonint")
  }

  logout() {
    this.authService.logout();
  }

  uerDet() {
    this.user = this.authService.currentUserDetails();
    // console.log(this.user.id)
    this.userId = this.user.id
  }

  getMyTasks(userId) {
    this.getMyTaskResult = this.authService.getMyTasks(userId);
    this.getMyTaskResult.subscribe((res) => {
      // console.log(res)

      this.getMyTaskList = res.result
      this.content = this.getMyTaskList.length
      // console.log(this.getMyTaskList.deadline)
      // console.log(this.getMyTaskList.length)
      // this.myProfile = res.emp.assignedTask;
      // this.getMyTaskList = this.myProfile.filter((_, i) => !(i % 2));
      // console.log(this.getMyTaskList);

    })
  }

  update(item) {
    // console.log(item)
    this.authService.singleTask = item;
  }

}
