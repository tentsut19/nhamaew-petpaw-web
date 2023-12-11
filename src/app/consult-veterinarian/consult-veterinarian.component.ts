import { Component, OnInit } from '@angular/core';
import { CatBotService} from 'src/app/shared';
declare var jquery: any;
declare var $: any;
declare var Swal: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-consult-veterinarian',
  templateUrl: './consult-veterinarian.component.html',
  styleUrls: ['./consult-veterinarian.component.css']
})
export class ConsultVeterinarianComponent implements OnInit {
  
  addForm: FormGroup;

  constructor(
    private spinner: NgxSpinnerService,
    private catBotService: CatBotService,
    private fb: FormBuilder,
  ) { 
    this.addForm = fb.group({
        'id': [''],
        'nameCat': [''],
        'breeds': [''],
        'keyword': [''],
        'year': [''],
        'month': [''],
        'sterilization': [''],
        'vaccine': [''],
        'historyDrugAllergy': [''],
        'surgery': [''],
        'congenitalDisease': [''],
        'initialSymptoms': [''],
        'address': [''],
        'ownerName': [''],
        'phoneNumber': [''],
        'email': [''],
        'status': [''],
        'botMode': ['']
    });

  }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.searchConsultVeterinarianByCriteriaPage();
    this.getAllTag();
  }

  tagList = []
  getAllTag() {
    this.tagList = []
    this.catBotService.getTag().subscribe(resp => {
      console.log(resp);
      this.tagList = resp;
    }, err => {
      console.log(err)
    });
  }

  responseList = []
  searchConsultVeterinarianByCriteriaPage() {
    this.responseList = []
    this.spinner.show();
    var params = this.getRequestParams();
    this.catBotService.searchConsultVeterinarianByCriteriaPage(params).subscribe(resp => {
      console.log(resp);

      if(resp.responseList){
        this.responseList = resp.responseList;
        this.count = resp.pagination.total_record;
        this.itemStart = resp.pagination.record_start;
        this.itemEnd = resp.pagination.record_end;
      }else{
        this.responseList = [];
        this.count = 0;
        this.itemStart = 0;
        this.itemEnd = 0;
      }

      setTimeout(() => {
        this.spinner.hide();
      }, 500);
    }, err => {
      this.spinner.hide();
      console.log(err)
    });
  }

  handlePageSizeChange(pageSizeOutPut){
    console.log("=== handlePageSizeChange pageSizeOutPut : "+pageSizeOutPut+"===");
    this.pageSizeOutPut = pageSizeOutPut;
    this.pageOutPut = 0;
    this.searchConsultVeterinarianByCriteriaPage();
  }

  handlePageChange(pageOutPut){
    console.log("=== handlePageChange pageOutPut : "+pageOutPut+"===");
    this.pageOutPut = --pageOutPut;
    console.log("=== handlePageChange pageOutPut : "+pageOutPut+"===");
    this.searchConsultVeterinarianByCriteriaPage();
  }

  daterange: any = {};
  startDate;
  endDate;
  optionsDate: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
  };
  selectedDate(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);
 
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.startDate = value.start._d;
    this.endDate = value.end._d;

    console.log(this.startDate);
    console.log(this.endDate);

    // use passed valuable to update state
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  isShowStartWork = false;
  showStartWork(){
    this.isShowStartWork = !this.isShowStartWork;
  }

  input;
  status = '';
  tagId = '';
  itemStart;
  itemEnd;
  page = 1;
  pageOutPut = 0;
  pageSizeOutPut = 10;
  count = 0;
  getRequestParams() {
    let params = {};

    if (this.input) {
      params[`input`] = this.input;
    }

    if (this.status) {
      params[`status`] = this.status;
    }
    
    if (this.tagId) {
      params[`tagId`] = this.tagId;
    }

    if (this.isShowStartWork) {
      if (this.startDate) {
        params[`startDate`] = this.startDate;
      }
      if (this.endDate) {
        params[`endDate`] = this.endDate;
      }
    }

    if (this.pageOutPut) {
      params[`pageIndex`] = this.pageOutPut;
    }

    if (this.pageSizeOutPut) {
      params[`recordPerPage`] = this.pageSizeOutPut;
    }

    console.log(params);
    return params;
  }

  openDialogDetail(data){
    this.addForm.patchValue({
      id: data.id,
      nameCat: data.nameCat,
      breeds: data.breeds,
      keyword: data.keyword,
      year: data.year,
      month: data.month,
      sterilization: data.sterilization,
      vaccine: data.vaccine,
      historyDrugAllergy: data.historyDrugAllergy,
      surgery: data.surgery,
      congenitalDisease: data.congenitalDisease,
      initialSymptoms: data.initialSymptoms,
      address: data.address,
      ownerName: data.ownerName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      status: data.status,
      botMode: data.botMode
    });
    $('#modal-detail').modal('show');
  }

  submitted_add = false;
  patchStatusAndBotMode(){
    this.submitted_add = true;
    if(this.addForm.invalid){
      return;
    }
    this.spinner.show();
    this.catBotService.patchStatusAndBotMode(this.addForm.value).subscribe(resp => {
      console.log(resp)
      this.spinner.hide();
      $('#modal-detail').modal('hide');
      this.searchConsultVeterinarianByCriteriaPage()
    }, err => {
      this.spinner.hide();
      this.failDialog('')
      console.log("=== err ===")
      console.log(err)
    });
  }

  successDialog(){
    Swal.fire("ทำรายการสำเร็จ!", "", "success");
  }

  failDialog(msg){
    Swal.fire({
      type: 'error',
      title: 'เกิดข้อผิดพลาด',
      text: msg
    })
  }
}
