import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {



  constructor(private auth: AuthService) {
    
  }

  login():void
  {
    this.auth.login();
  }
}
