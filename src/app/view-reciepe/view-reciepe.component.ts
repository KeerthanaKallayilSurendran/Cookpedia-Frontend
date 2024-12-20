import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../srvices/api.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-view-reciepe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './view-reciepe.component.html',
  styleUrl: './view-reciepe.component.css'
})
export class ViewReciepeComponent {

  recipeId:string = ""
  recipe:any = {}
  allRelatedRecipes:any = []

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(){
    this.route.params.subscribe((res:any)=>{
      this.recipeId = res.id
      console.log(this.recipeId);
      this.getRecipeDetails(this.recipeId)
      
    })
  }

  getRecipeDetails(recipeId:string){
    this.api.viewRecipeAPI(recipeId).subscribe((res:any)=>{
      this.recipe = res
      console.log(this.recipe);
      this.getAllRelatedRecipes(res.cuisine)
    })
  }

  getAllRelatedRecipes(cuisine:string){
    this.api.relatedRecipesAPI(cuisine).subscribe((res:any)=>{
      if(res.length>1){
        this.allRelatedRecipes = res.filter((item:any)=>item.name!=this.recipe.name)
      console.log((this.allRelatedRecipes));
      }else{
        this.allRelatedRecipes = []
      }
    })
  }

  downloadRecipe(){
    this.api.downloadRecipeAPI( this.recipeId,this.recipe).subscribe((res:any)=>{
      this.api.getChartData()
      this.generatePDF()
    })
  }

  generatePDF(){
    const pdf = new jspdf()
    pdf.setFontSize(16)
    pdf.setTextColor("green")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine: ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings: ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking: ${this.recipe.difficulty}`,10,30)
    pdf.text(`Prepration Time: ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Cooking Time: ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Toatal Calories Per Serving: ${this.recipe.caloriesPerServing}`,10,45)
    let head = [['Ingredients Needed', 'Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients, this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save(`${this.recipe.name}.pdf`)
  }

  saveRecipe(){
    this.api.saveRecipeAPI(this.recipeId, this.recipe).subscribe({
      next:(res:any)=>{
        alert("Recipe Added Successfully")
      },
      error:(reason:any)=>{
        alert(reason.error)
      }
    })
  }

}
