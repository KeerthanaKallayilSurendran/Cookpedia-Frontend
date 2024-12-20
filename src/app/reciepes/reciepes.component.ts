import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../srvices/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reciepes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SearchPipe, FormsModule, NgxPaginationModule],
  templateUrl: './reciepes.component.html',
  styleUrl: './reciepes.component.css'
})
export class ReciepesComponent {
  searchKey:string = ""
  allrecipes:any = []
  cuisineArray:any = []
  mealTypeArry:any = []
  dummyAllRecipes:any = []
  p: number = 1;

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.allrecipes = res
      this.dummyAllRecipes = this.allrecipes
      console.log(this.allrecipes);
      this.allrecipes.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        // !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)

      })
      console.log(this.cuisineArray);
      const dummyMeal = this.allrecipes.map((item:any)=>item.mealType)
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArry.includes(item) && this.mealTypeArry.push(item)
      })
    })
  }

  filterAllRecipes(key:string, value:string){
    this.allrecipes = this.dummyAllRecipes.filter((item:any)=>item[key].includes(value))
  }
  viewRecipe(recipeId:string){
    if(sessionStorage.getItem("token")){
      this.router.navigateByUrl(`recipe/${recipeId}/view`)

    }else{
      alert("Please login to get full access to our Recipe Details!!!")
    }
  }
}
