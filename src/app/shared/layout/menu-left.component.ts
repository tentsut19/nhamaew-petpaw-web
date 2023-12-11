import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'layout-menu-left',
  templateUrl: './menu-left.component.html'
})


export class MenuLeftComponent { 
  cabsatToken;
  public isCustomerCollapsed = true;
  public isBranchCollapsed = true;
  public isSettingCollapsed = true;
  public isActive = true;
  constructor( private authenticationService: AuthenticationService
  ) { 
  }

  estimateWorkSheet = false
  personnel
  ngOnInit() {
    this.cabsatToken = localStorage.getItem('accessToken');
    if(this.cabsatToken == null){
      this.logout();
    }

  }

  logout() {
    this.authenticationService.logout();
    location.reload()
}

}
