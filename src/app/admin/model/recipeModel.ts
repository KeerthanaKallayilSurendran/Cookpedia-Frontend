export class RecipeModel {
    name?:string
    ingredients?:Array<string>
    instructions?:Array<string>
    prepTimeMinutes?:string
    cookTimeMinutes?:string
    servings?:number
    difficulty?:string
    cuisine?:string
    caloriesPerServing?:number
    image?:string
    mealType?:Array<string>
}