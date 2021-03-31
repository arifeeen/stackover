import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchJsonService } from '../fetch-json.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  questionData: any;
  paginationArray:Array<number>;
  currentPageIndex:number = 1;

  constructor(private router: Router, private fetchService:FetchJsonService) {
    this.questionData = this.router.getCurrentNavigation().extras.state;
    console.log('question date', this.questionData);
    this.paginationArray = [1,2,3,4,5,6,7,8,9,10];
   }

  ngOnInit(): void {
    
  }
  
  pageChange(id){
    this.currentPageIndex = +id;
    if(+id === this.paginationArray[this.paginationArray.length - 1]) {
      this.paginationArray = this.range(+id - 8,+id+1,1);
    } else if (+id === this.paginationArray[0] && +id!==1) {
      this.paginationArray = this.range(+id-1, +id+8, 1)
    }
    this.fetchService.getSearchResults(this.fetchService.currentSearchObject,id).subscribe(result => {
      this.questionData = result;
    })
     
  }

  range(start, stop, step) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
}
  goBack() {
    this.pageChange(this.currentPageIndex-1);
  }

  goNext() {
    this.pageChange(this.currentPageIndex + 1);
  }
}
