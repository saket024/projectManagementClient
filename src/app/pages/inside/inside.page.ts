import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { AuthService } from './../../services/auth.service';
import { Router, RouterEvent } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inside',
  templateUrl: './inside.page.html',
  styleUrls: ['./inside.page.scss'],
})
export class InsidePage implements OnInit {
  user = null;
  message: string;

  pages = [
    {
      title: 'Tasks',
      url: '/inside/tasks',
      icon: 'document-attach-outline'
    },
    {
      title: 'Employees',
      url: '/inside/employees',
      icon: 'people-outline'
    },
    {
      title: 'Create',
      url: '/inside/create',
      icon: 'add-circle-outline'
    },
  ]
  selectedPath = '';
  // results: Observable<any>;
  uresults: Observable<any>;
  // userName = '';
  curUseName: string;
  curUseEmail: string;
  constructor(private authService: AuthService, private storage: Storage, private toastController: ToastController) {
    // console.log("inside");
    this.uerDet();

  }



  ngOnInit() {
  }

  uerDet() {
    this.user = this.authService.currentUserDetails();
    // console.log(this.user.id)
  }

  logout() {
    this.authService.logout();
  }



}
