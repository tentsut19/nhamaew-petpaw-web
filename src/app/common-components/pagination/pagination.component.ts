import {AfterViewInit, Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

interface State {
  page: number;
  pageOffset: number;
}

@Component({
  selector: 'basic-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Output() pageOutPut : EventEmitter<any> = new EventEmitter<any>();
  @Output() pageSizeOutPut : EventEmitter<any> = new EventEmitter<any>();

  @Input('itemStart') itemStart;
  @Input('itemEnd') itemEnd;
  @Input('itemTotal') itemTotal;
  
  items = new Array();
  currentItem = null;
  currentIndex = -1;
  @Input('page') page = 1;
  @Input('count') count = 100;
  @Input('pageSize') pageSize = 50;

  constructor() 
  {
      this.pageOutPut.emit(1);
  }

  handlePageChange(event) {
    this.pageOutPut.emit(event);
    console.log("=== handlePageChange page : "+this.page+"===");
    this.page = event;
    console.log(this.page);
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    console.log("=== pageSize : "+this.pageSize+"===");
    this.page = 1;
    // this.pageOutPut.emit(1);
    this.pageSizeOutPut.emit(this.pageSize);
    console.log(this.page);
  }

  // setActiveTutorial(item, index) {
  //   console.log("=== setActiveTutorial : item:"+item+", index:"+index+" ===");
  //   this.currentItem = item;
  //   this.currentIndex = index;
  // }
}