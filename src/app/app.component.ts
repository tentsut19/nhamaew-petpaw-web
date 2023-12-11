import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  accessToken = null;
  name = null;
  ngOnInit() {
    this.accessToken = localStorage.getItem('accessToken');
    this.name = localStorage.getItem('name');
    // var object = JSON.parse(localStorage.getItem("key"));
    console.log(this.accessToken);
    console.log(this.name);
  }
}
