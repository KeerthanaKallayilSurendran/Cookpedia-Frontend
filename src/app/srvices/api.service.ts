import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  server_url = "http://localhost:3000"
  getAllRecipeAPI(){
    return this.http.get(`${this.server_url}/all-recipes`)
  }
  addTestimonyAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-testimony`, reqBody)
  }
  
  registerAPI(reqBody:any){
    return this.http.post(`${this.server_url}/register`, reqBody)
  }

  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`, reqBody)
  }

  // append token in req header
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    // header must be a object so we enclosed in a curly braces
    return {headers}
  }

  viewRecipeAPI(recipeId:string){
    return this.http.get(`${this.server_url}/recipe/${recipeId}/view`, this.appendToken())

  }
  // related-recipes?cuisine=
  relatedRecipesAPI(cuisine:string){
    return this.http.get(`${this.server_url}/related-recipes?cuisine=${cuisine}`, this.appendToken())
  }
  // recipe/674ecf287d874ef1b3843fac/download
  downloadRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/download`, reqBody, this.appendToken())
  }

  saveRecipeAPI(recipeId:string, reqBody:any){
    return this.http.post(`${this.server_url}/recipe/${recipeId}/save`, reqBody, this.appendToken())
  }
  // get-save-recipe
  getUserSaveRecipesAPI(){
    return this.http.get(`${this.server_url}/get-save-recipe`, this.appendToken())
  }

  // /save-recipes/:id/remove
  removeSaveRecipesAPI(id:string){
    return this.http.delete(`${this.server_url}/save-recipes/${id}/remove`, this.appendToken())
    
  }

   // user-downloads
   getUserDownloadRecipesAPI(){
    return this.http.get(`${this.server_url}/user-downloads`, this.appendToken())
  }

  // /user/edit
  editUserAPI(reqBody:any){
    return this.http.post(`${this.server_url}/user/edit`, reqBody, this.appendToken())
  }

  // /user-list
  allUserAPI(){
    return this.http.get(`${this.server_url}/user-list`, this.appendToken())
  }

  // download-list
  allDownloadAPI(){
    return this.http.get(`${this.server_url}/download-list`, this.appendToken())
  }

  // /all-feedbacks
  allFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-feedbacks`, this.appendToken())
  }
  // feedback/675028680511bf264cac6e23/update?status=Approved
  updateFeedbackStatusAPI(feedbackId:string, status:string){
    return this.http.get(`${this.server_url}/feedback/${feedbackId}/update?status=${status}`, this.appendToken())
  }

  // all-approved-feedbacks
  allApprovedFeedbackAPI(){
    return this.http.get(`${this.server_url}/all-approved-feedbacks`, this.appendToken())
  }

  // add-recipe
  addRecipeAPI(reqBody:any){
    return this.http.post(`${this.server_url}/add-recipe`, reqBody, this.appendToken())
  }

  // /recipe/:id/edit
  updateRecipeAPI(id:string, reqBody:any){
    console.log(id);
    
    return this.http.put(`${this.server_url}/recipe/${id}/edit`, reqBody, this.appendToken())
  }

  // /recipe/:id/delete
  deleteRecipeAPI(id:string){
    return this.http.delete(`${this.server_url}/recipe/${id}/delete`, this.appendToken())
  }

  getChartData(){
    this.allDownloadAPI().subscribe((res:any)=>{
      let downloadArrayList:any = []
      let output:any = {}
      res.forEach((item:any)=>{
        let cuisine = item.recipeCuisine
        let currentCount = item.count
        if(output.hasOwnProperty(cuisine)){
          output[cuisine] += currentCount
        }else{
          output[cuisine] = currentCount
        }
      })
      for(let cuisine in output){
        downloadArrayList.push({name:cuisine,y:output[cuisine]})
      }
      console.log(downloadArrayList);
      localStorage.setItem("chart",JSON.stringify(downloadArrayList))
    })
  }

}
