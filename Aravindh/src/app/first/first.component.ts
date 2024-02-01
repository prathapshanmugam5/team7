import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { Image } from '../image';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {
  ngOnInit(): void {

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.getAllimage();

  }

  allImage:Image[]=[];

  constructor(private imgSer:ImageService){}

  getAllimage(){
    this.imgSer.getAllImage().subscribe((res)=>{
     this.allImage=res;
     console.log(this.allImage);
    });

  }

}
