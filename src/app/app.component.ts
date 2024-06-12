import {Component, inject, OnInit} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  loggedIn = false;

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if(user){
          this.authService.currentUserSignal.set({
            id: user.uid,
            email: user.email!
          })
          this.loggedIn = true;
        } else{
          this.authService.currentUserSignal.set(null);
          this.loggedIn = false;
        }
        console.log(this.authService.currentUserSignal())
      });
  }
  title = '💥Crazy Cash Overview💥';
  private auth = inject(Auth);

  authService = inject(AuthService)

  logout(){
    this.authService.logout().subscribe();
  }
}
