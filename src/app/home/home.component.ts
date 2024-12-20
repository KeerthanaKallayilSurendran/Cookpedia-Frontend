import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ApiService } from '../srvices/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  allRecipes:any = []
  allapprovedFeedback:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllRecipes()
    this.getAllApprovedFeedback()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allRecipes = res.slice(0,6)
      console.log(this.allRecipes);
      
    })
  }

  getAllApprovedFeedback(){
    this.api.allApprovedFeedbackAPI().subscribe((res:any)=>{
      this.allapprovedFeedback = res
      console.log(this.allapprovedFeedback);
      
    })
  }
}
