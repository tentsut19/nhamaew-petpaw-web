import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { CatBotService} from 'src/app/shared';
import { Router, ActivatedRoute } from '@angular/router';
declare var jquery: any;
declare var $: any;
declare var Swal: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-intents-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class IntentsDetailComponent {
  userExpressionName = ''
  userResponseName = ''
  intentsId
    constructor(private activatedRoute: ActivatedRoute,
        private spinner: NgxSpinnerService,
        private catBotService: CatBotService,
        private router: Router,
        private renderer: Renderer2) { 

        }


    ngOnInit() {
      this.activatedRoute.params.forEach((urlParams) => {
        this.intentsId = urlParams['id'].replace('#', '');
        console.log("intentsId : "+this.intentsId);
        this.getIntents()
      });
    }

    intents = {name:'', userExpressionList:[], userResponseList:[]}
    getIntents() {
      $("#intents_table").DataTable().clear().destroy();
      this.spinner.show();
      this.catBotService.getIntentsVerifyById(this.intentsId).subscribe(resp => {
        console.log(resp);
        this.intents = resp
        setTimeout(() => {
          this.spinner.hide();
        }, 100);
      }, err => {
        this.spinner.hide();
        console.log(err)
      });
    }

    validateAddUserExpressionList(){
      var inValid = false
      this.intents.userExpressionList.forEach(userExpression => {
        if(this.userExpressionName == userExpression.name){
          inValid = true
        }
      })

      if(inValid){
        this.warningDialog('User Expression ซ้ำ','User Expression : '+this.userExpressionName+' ซ้ำใน Intents นี้')
        this.userExpressionName = ''
        return
      }

      var req = {"intentsId":this.intentsId, "userExpressionName":this.userExpressionName}
      this.spinner.show();
      this.catBotService.validateUserExpression(req).subscribe(resp => {
        console.log(resp);
        setTimeout(() => {
          this.spinner.hide();

          this.addUserExpressionList()
        }, 100);
      }, err => {
        this.spinner.hide();
        console.log(err)
        if(err.error && err.error.errors.length > 0) {
          this.failDialog(err.error.errors[0].message)
          this.warningDialog('User Expression ซ้ำ',err.error.errors[0].message)
        }else{
          this.warningDialog('User Expression ซ้ำ','')
        }
        this.userExpressionName = ''
      });
    }

    addUserExpressionList(){
      var userExpression = {
        name: this.userExpressionName
      }
      this.intents.userExpressionList.push(userExpression);
      this.userExpressionName = ''
    }

    removeUserExpressionList(index){
      this.intents.userExpressionList.splice(index, 1);
    }

    addUserResponseList(){
      var userResponse = {
        name: this.userResponseName
      }
      this.intents.userResponseList.push(userResponse);
      this.userResponseName = ''
    }

    removeUserResponseList(index){
      this.intents.userResponseList.splice(index, 1);
    }

    validateSubmit(){
      if(this.intents.userExpressionList.length == 0){
        this.warningDialog('Please provide user Expression','')
        return
      }else if(this.intents.userResponseList.length == 0){
        this.warningDialog('Please provide responses','')
        return
      }else{
        this.submit()
      }
    }

    submit(){
      this.spinner.show()
      this.catBotService.putIntentsVerifyDetail(this.intents).subscribe(resp => {
        this.spinner.hide()
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }, err => {
        let errorMessage = {};
        if(err.error && err.error.errors.length > 0) {
          if(err.error.errors[0].code=='duplicate'){
            this.failDialog(err.error.errors[0].message)
          }else{
            this.failDialog('')
          }
        }else{
          this.failDialog('')
        }
        this.spinner.hide()
        console.log("=== err ===")
        console.log(err)
      });
    }

    successDialog(){
      Swal.fire({
        icon: 'success',
        title: 'ทำรายการสำเร็จ!',
        showConfirmButton: false,
        timer: 1500
      })
    }

    failDialog(msg){
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: msg
      })
    }

    warningDialog(title,msg){
      Swal.fire({
        icon: 'warning',
        title: title,
        text: msg
      })
    }

    openDialogDelete(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner.show()
          this.catBotService.deleteIntents(this.intentsId).subscribe(resp => {
            this.spinner.hide()
            Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
            )
            setTimeout(() => {
              this.router.navigate(['/intents']);
            }, 1000);
          }, err => {
            this.spinner.hide()
            this.failDialog('')
            console.log("=== err ===")
            console.log(err)
          });


        }
      })
    }

}
