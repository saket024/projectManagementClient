import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ToastController } from '@ionic/angular';

const TOKEN_KEY = 'access_token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  singleTask: any;
  allTasks: Object;
  allEmployees: any;
  url = environment.url;
  user: any = []
  authenticationState = new BehaviorSubject(false);
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  comments: any;

  constructor(private http: HttpClient, private helper: JwtHelperService, private storage: Storage,
    private plt: Platform, private alertController: AlertController, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.checkToken();
      this.roleChecker();
    });

  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if (!isExpired) {
          this.user = decoded;
          this.authenticationState.next(true);
        } else {
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }




  register(credentials) {
    return this.http.post(`${this.url}/api/register`, credentials).pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
    );
  }

  roleChecker() {
    if (this.user.role == 'admin') {
      return this.isAdmin = true;
    } else {
      return this.isAdmin = false;
      // returnthis.isEmployee = true;
    }
  }

  login(credentials) {
    return this.http.post(`${this.url}/api/login`, credentials)
      .pipe(
      tap(res => {
        // console.log("Admin: " + this.isAdmin);
        // console.log("Employee: " + this.isEmployee);
        this.storage.set(TOKEN_KEY, res['token']);
        this.user = this.helper.decodeToken(res['token']);
        // if (this.user.role == 'admin') {
        //   this.isAdmin = true;
        //   this.isEmployee = false;
        // } else {
        //   this.isEmployee = true;
        //   this.isAdmin = false;
        // }
        // console.log("Admin: " + this.isAdmin);
        // console.log("Employee: " + this.isEmployee);
        this.authenticationState.next(true);
        // console.log(this.user)


      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
      );
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
      this.isAdmin = false;
      this.isEmployee = false;
      // console.log(this.isAdmin)
      // console.log(this.isEmployee)
    });
  }

  currentUserDetails() {

    return this.user;
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }


  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  showToast(msg) {
    let toast = this.toastController.create({
      // header: 'Success!',
      message: msg,
      position: 'bottom',
      color: 'success',
      duration: 3000
    });
    toast.then(toast => toast.present());
  }


  // Admin functions
  getAllEmployees() {
    // console.log("cliked")
    // console.log(this.user.role)
    return this.http.get(`${this.url}/api/getAllEmployees`).pipe(
      tap(results => {
        // this.allEmployees = results
        return results
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
    )
  }
  getAllTasks() {
    // console.log("cliked")
    return this.http.get(`${this.url}/api/getAllTasks`).pipe(
      tap(results => {
        this.allTasks = results
        return results
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
    )
  }

  createEmployee(employeeDetails) {
    // console.log("creating employee " + employeeDetails)
    return this.http.post(`${this.url}/api/createEmployees`, employeeDetails)
      .pipe(
      tap(res => {
        this.showToast(res)
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
      )
  }

  createTask(taskDetails) {
    // console.log("creating task: " + taskDetails)
    return this.http.post(`${this.url}/api/createTask`, taskDetails)
      .pipe(
      tap(res => {
        this.showToast(res)
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
      )
  }

  assignTask(task) {
    return this.http.post(`${this.url}/api/assignTask`, task)
      .pipe(
      tap(res => {
        this.showToast(res)
      }),
      catchError(e => {
        // console.log(e.error)
        this.showAlert(e.error);
        throw new ErrorEvent(e);
      })
      )
  }

  // Employee functions

  getMyTasks(userId) {
    // console.log(userId)
    return this.http.get(`${this.url}/api/getMyTasks?userId=${userId}`).pipe(
      tap(results => {
        // console.log(results)
        this.allTasks = results
        return results
      }),
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
    )
  }

  addComment(comment) {
    // console.log("creating task: " + comment)
    return this.http.post(`${this.url}/api/addComment`, comment)
      .pipe(
      catchError(e => {
        this.showAlert(e.error.msg);
        throw new ErrorEvent(e);
      })
      )
  }

  getComments(taskId) {
    // console.log(taskId)
    return this.http.get(`${this.url}/api/getComments?taskId=${taskId}`)
      .pipe(
      catchError(e => {
        this.showAlert(e.error.msg)
        throw new ErrorEvent(e)
      })
      )

  }

  setProgress(progressDet) {
    return this.http.post(`${this.url}/api/setProgress`, progressDet)
      .pipe(
      tap(res => {
        this.showToast(res)
      }),
      catchError(e => {
        this.showAlert(e.error.msg)
        throw new ErrorEvent(e)
      })
      )
  }

}
