import {Component, inject, OnInit} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if(user){
          this.authService.currentUserSignal.set({
            id: user.uid,
            email: user.email!
          })
        } else{
          this.authService.currentUserSignal.set(null);
        }
        console.log(this.authService.currentUserSignal())
      });
  }
  title = '💥Crazy Cash Overview💥';
  private auth = inject(Auth);

  authService = inject(AuthService)
}
