import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../srvices/api.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent {

  allRecipes:any = []

  constructor(private api:ApiService){}
  ngOnInit(){
    this.getAllSavedRecipes()
  }
  getAllSavedRecipes(){
    this.api.getUserSaveRecipesAPI().subscribe((res:any)=>{
      this.allRecipes = res
      console.log(this.allRecipes);
      
    })
  }

  removeSaveRecipe(id:string){
    this.api.removeSaveRecipesAPI(id).subscribe((res:any)=>{
      this.getAllSavedRecipes()
    })
  }

}
