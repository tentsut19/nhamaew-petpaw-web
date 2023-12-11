import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  personnel;

  constructor( 
      private router: Router,
    ) { 
    }
  
    ngOnInit() {
      this.personnel = JSON.parse(localStorage.getItem('cabsatToken'));
      this.getNotify();
    }
  
    isActiveNotify = false;
    notifySize;
    notifyList;
    getNotify(){

    }

    clickNotify(id,url){
      var request = {};
      // this.notificationService.readNotification(id,request).subscribe(data=>{
      //   this.router.navigate([url]);
      // });
    }

}
