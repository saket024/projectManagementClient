import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {
  employeeResult: Observable<any>;
  employeeList: any = [];
  assignedTo: any;
  assignDetails: {}
  taskResult: Observable<any>;
  taskList: any = [];
  assignResult: any;
  zero: number = 0;
  content: any;
  // taskList: any = [];
  constructor(private authService: AuthService) {
    this.getAllTasks();

  }

  ngOnInit() {
    this.getAllTasks();
    this.getAllEmployees();
  }

  getAllTasks() {
    // console.log("get-all-Tasks")
    this.taskResult = this.authService.getAllTasks();
    this.taskResult.subscribe((res) => {
      // console.log(res)
      this.taskList = res.tasks;
      this.content = this.taskList.length
    })
  }
  getAllEmployees() {
    // console.log("get-all-employees")
    this.employeeResult = this.authService.getAllEmployees();
    this.employeeResult.subscribe((res) => {
      // console.log(res)
      this.employeeList = res.employees;
    })
  }
  assign() {
    let str = this.assignedTo
    let strArr = str.split(',')
    this.assignDetails = {
      userId: strArr[0],
      username: strArr[1],
      taskId: strArr[2],
      taskName: strArr[3]
    }
    // console.log(this.assignDetails)
    this.assignResult = this.authService.assignTask(this.assignDetails).subscribe();
    this.getAllTasks();
  }

  viewComments(item) {
    // console.log("clicked view comments")
    // console.log(item)
    this.authService.singleTask = item;
  }




}
