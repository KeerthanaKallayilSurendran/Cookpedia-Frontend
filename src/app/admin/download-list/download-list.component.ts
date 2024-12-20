import { Component } from '@angular/core';
import { ApiService } from '../../srvices/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent {
  allDownloadList:any = []
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllDownload()
  }
  getAllDownload(){
    this.api.allDownloadAPI().subscribe((res:any)=>{
      this.allDownloadList = res
      console.log(res);
      
    })
  }
}
