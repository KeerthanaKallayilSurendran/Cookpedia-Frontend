import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../srvices/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileImg:string ="https://cdn2.iconfinder.com/data/icons/leto-user-actions/64/__user_upload_profile-512.png"
  allRecipeDownload:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getUserDownload()
    const user = JSON.parse(sessionStorage.getItem("user")||"")
    if(user.profileImg){
      this.profileImg = user.profileImg
    }
  }

  getUserDownload(){
    this.api.getUserDownloadRecipesAPI().subscribe((res:any)=>{
      this.allRecipeDownload = res
      console.log(this.allRecipeDownload);
      
    })
  }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    console.log(uploadFile);
    
    // convert file into url
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      console.log(event.target.result);
      this.profileImg = event.target.result
      
    }
  }

  updateProfile(){
    this.api.editUserAPI({profileImg:this.profileImg}).subscribe((res:any)=>{
      sessionStorage.setItem("user",JSON.stringify(res))
      this.profileImg = res.profileImg
      alert("Profile Updated Successfully!!!")
    })
  }
}
