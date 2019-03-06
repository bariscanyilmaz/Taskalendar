import { Component, OnInit, HostListener } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @HostListener('window:keypress', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if(event.keyCode==13){
        this.Login();
      }
  }

  isError=false;
  resultMessage:string='';
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  Login() {

    const user = new User();
    if (!this.email || !this.password) {
      alert('email or password not be null');
    } else {

      user.email = this.email;
      user.password = this.password;

      this.authService.LogIn(user).subscribe((result: any) => {
        if (result.isSuccessful) {
          
          localStorage.setItem('token', result.token);
          this.router.navigate(['calendar']);

        }else{
          this.isError=true;
          this.resultMessage=result.message;
        }
      });



    }

  }

}
