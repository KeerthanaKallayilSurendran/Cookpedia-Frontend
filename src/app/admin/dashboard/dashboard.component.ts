import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../srvices/api.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  Highcharts: typeof Highcharts = Highcharts
  chartOptions = {}
  selected = new Date()
  isSidebarOpen:boolean = true
  colWidth:string = 'col-lg-10'
  userCount:number = 0
  recipeCount:number = 0
  downloadCount:number = 0
  requestCount:number = 0

  ngOnInit(){
    this.getUserCount()
    this.getDownloadCount()
    this.getRecipeCount()
    this.getRequestCount()
  }

  constructor(private router:Router, private api:ApiService){
    if(localStorage.getItem("chart")){
      let chartData = JSON.parse(localStorage.getItem("chart")||"")
      this.chartOptions = {
        chart :{
          type:"bar"
        },
        title:{
          text:"Analysis of Download Recipes Based on Cuisine",
          align:"left"
        },
        xAxis:{
          type:"category"
        },
        yAxis:{
          title:{
            text:"Total Download Recipe Count"
          }
        },
        legend:{
          enabled:false
        },
        credits:{
          enabled:false
        },
        series:[{
          name:"Cuisine",
          colorByPoint:true,
          type:'bar',
          data:chartData
        }]
      }
    }
  }

  getUserCount(){
    this.api.allUserAPI().subscribe((res:any)=>{
      this.userCount = res.length
    })
  }

  getRecipeCount(){
    this.api.getAllRecipeAPI().subscribe((res:any)=>{
      this.recipeCount = res.length
    })
  }

  getDownloadCount(){
    this.api.allDownloadAPI().subscribe((res:any)=>{
      this.downloadCount = res.map((itme:any)=>itme.count).reduce((a:any,b:any)=>a+b)
    })
  }

  getRequestCount(){
    this.api.allFeedbackAPI().subscribe((res:any)=>{
      this.requestCount = res.filter((item:any)=>item.status=='Pending').length
    })
  }

  menueBtnClick(){
    this.isSidebarOpen = !this.isSidebarOpen
    this.colWidth = 'col'
  }

  logout(){
    sessionStorage.clear()
    localStorage.clear()
    this.router.navigateByUrl('/')
  }

}
