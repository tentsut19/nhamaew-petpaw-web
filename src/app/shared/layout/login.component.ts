import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { first } from 'rxjs/operators';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'login-init',
  templateUrl: './login.component.html'
})
export class LoginInitComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService
  ) {
   }

  ngOnInit() {
  }

  loginUser(e){
    e.preventDefault();
      var username = e.target.elements[0].value;
      var password = e.target.elements[1].value;
      var employee = {'username':username, 'password':password};
      console.log(employee);
      this.authenticationService.login(username, password)
      .pipe(first())
      .subscribe(
          data => {
              console.log(data)
              location.reload()
          },
          error => {
            
          });

  }
}
