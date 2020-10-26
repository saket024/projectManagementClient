import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.authService.authenticationState.subscribe(state => {
        if (state) {
          // this.router.navigate(['inside/tasks'])
          this.authService.roleChecker();
          // console.log(this.authService.isAdmin)
          let roleGaurd = this.authService.isAdmin
          // console.log(roleGaurd)
          if (roleGaurd) {
            // console.log("Admin in")
            this.router.navigate(['inside/tasks'])
          }
          else {
            // this.initializeApp();
            // console.log("Employee in")
            this.router.navigate(['my-tasks'])
          }
        } else {
          this.router.navigate(['login'])
        }
      })
    });
  }
}
