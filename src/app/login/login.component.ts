import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../srvices/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup
  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.loginForm = this.fb.group({
      email:["",[Validators.required, Validators.email]],
      password:["",[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      console.log(email, password);
      this.api.loginAPI({email,password}).subscribe({
        next:(res:any)=>{
          sessionStorage.setItem("user",JSON.stringify(res.user))
          sessionStorage.setItem("token",res.token)
          this.api.getChartData()
          this.loginForm.reset()
          if(res.user.role=='user'){
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('/admin')
          }
        },
        error:(reason:any)=>{
          alert(reason.error)
        }
      })
      
    }else{
      alert("Invalid Form")
    }
  }
}
