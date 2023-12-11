import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntentsComponent } from './intents/intents.component';
import { IntentsDetailComponent } from './intents/detail/detail.component';
import { ConsultVeterinarianComponent } from './consult-veterinarian/consult-veterinarian.component';

const routes: Routes = [
  {
    path: '',
    component: IntentsComponent
    //,canActivate: [NeedAuthGuard]
  },
  {
    path: 'intents',
    component: IntentsComponent
    //,canActivate: [NeedAuthGuard]
  },
  {
    path: 'intents/detail/:id',
    component: IntentsDetailComponent
    //,canActivate: [NeedAuthGuard]
  },
  {
    path: 'consult-veterinarian',
    component: ConsultVeterinarianComponent
    //,canActivate: [NeedAuthGuard]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
