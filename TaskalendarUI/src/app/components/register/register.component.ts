import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  email:string='';
  password:string='';
  namesurname:string='';

  ngOnInit() {
  }

  Register(){
    const user=new User();
    user.email=this.email;
    user.password=this.password;
    user.namesurname=this.namesurname;
    this.authService.Register(user).subscribe((result:any)=>{
      if(result.isSuccessful){
        this.router.navigate(['login']);
      }else{
        alert(result.message);
      }
    });
    
    

  }

}
