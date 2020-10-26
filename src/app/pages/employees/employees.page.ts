import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  employeeResult: Observable<any>;
  employeeList: any = [];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    // console.log("get-all-employees")
    this.employeeResult = this.authService.getAllEmployees();
    this.employeeResult.subscribe((res) => {
      // console.log(res)
      this.employeeList = res.employees;
    })
  }


}
