import { Component, Input } from '@angular/core';
import { ApiService } from '../../srvices/api.service';
import { RecipeModel } from '../model/recipeModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent {

  @Input() id !: string
  recipeDetails:RecipeModel = {}
  cuisineArray:any = []
  mealTypeArry:any = []
  ingredients:any = []
  instructions:any = []
  mealArray:any = []

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(){
    this.getAllRecipes()
  }

  getAllRecipes(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      if(this.id){
        this.recipeDetails = res.find((item:any)=>item._id==this.id)
        this.ingredients = this.recipeDetails.ingredients
        this.instructions = this.recipeDetails.instructions
        this.mealArray = this.recipeDetails.mealType
      }
      res.forEach((item:any)=>{
        !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)
        // !this.cuisineArray.includes(item.cuisine) && this.cuisineArray.push(item.cuisine)

      })
      console.log(this.cuisineArray);
      const dummyMeal = res.map((item:any)=>item.mealType)
      const flatDummyArray = dummyMeal.flat(Infinity)
      flatDummyArray.forEach((item:any)=>{
        !this.mealTypeArry.includes(item) && this.mealTypeArry.push(item)
      })
      console.log(this.mealTypeArry);
      
    })
  }

  addRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    console.log(this.recipeDetails);
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.addRecipeAPI(this.recipeDetails).subscribe({
        next:(res:any)=>{
          alert("Recipe Added Successfully!")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-lsit")
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.recipeDetails.name = ""
        }
      })
      
    }else{
      alert("Fill the form completely!!")
    }
  }

  addIngredients(ingredientInput:any){
    if(ingredientInput.value){
      this.ingredients.push(ingredientInput.value)
      ingredientInput.value = ""
      console.log(this.ingredients);
      
    }
  }

  addInstructions(instrucctionInput:any){
    if(instrucctionInput.value){
      this.instructions.push(instrucctionInput.value)
      instrucctionInput.value = ""
      console.log(this.instructions);
      
    }
  }

  removeInstructions(value:string){
    this.instructions = this.instructions.filter((item:string)=>item!=value)
  }

  removeIngredients(value:string){
    this.ingredients = this.ingredients.filter((item:string)=>item!=value)
  }

  mealTypeSelect(event:any){
    if(event.target.checked){
      !this.mealArray.includes(event.target.name)  && this.mealArray.push(event.target.name)
    }else{
      this.mealArray = this.mealArray.filter((item:string)=>item!=event.target.name)
    }
    console.log(this.mealArray);
    
  }

  removeMealType(meal:any){
    this.mealArray = this.mealArray.filter((item:string)=>item!=meal)
  }

  updateRecipe(){
    this.recipeDetails.ingredients = this.ingredients
    this.recipeDetails.instructions = this.instructions
    this.recipeDetails.mealType = this.mealArray
    console.log(this.recipeDetails);
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType } = this.recipeDetails
    if(name && ingredients!.length>0 && instructions!.length>0 && prepTimeMinutes && cookTimeMinutes && servings && difficulty && cuisine && caloriesPerServing && image && mealType!.length>0){
      this.api.updateRecipeAPI(this.id ,this.recipeDetails).subscribe((res:any)=>{
          alert("Recipe Updated Successfully!")
          this.recipeDetails = {}
          this.ingredients = []
          this.instructions = []
          this.mealArray = []
          this.router.navigateByUrl("/admin/recipe-lsit")
      })
      
    }else{
      alert("Fill the form completely!!")
    }
  }

}
