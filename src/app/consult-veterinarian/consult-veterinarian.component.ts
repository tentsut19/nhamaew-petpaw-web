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
        'weightRangeName': [''],
        'breeds': [''],
        'keyword': [''],
        'year': [''],
        'month': [''],
        'genderCat': [''],
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
        'followUpDate': [''],
        'followUpStartTime': [''],
        'followUpEndTime': [''],
        'moreDetails': [''],
        'customerGroup': [''],
        'symptomLevel': [''],
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

        this.responseList.forEach(response => {
          response.symptomLevelStyleBackground = {
            "background-color": response.symptomLevel,
          }
        })

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

  isShowFollowUp = false;
  showFollowUp(){
    this.isShowFollowUp = !this.isShowFollowUp;
  }

  startFollowUpDate;
  endFollowUpDate;
  selectedFollowUp(value: any, datepicker?: any) {
    // this is the date  selected
    console.log(value);
 
    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.startFollowUpDate = value.start._d;
    this.endFollowUpDate = value.end._d;

    console.log(this.startDate);
    console.log(this.endDate);
  }

  optionsSingleDate: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true,
  };
  selectedFollowUpDate(value: any, datepicker?: any) {
    console.log(value);
    console.log(datepicker);
    this.addForm.patchValue({
      followUpDate: this.convertDateToStrngDDMMYYYY(value.start._d),
    });
  }
  setFollowUpDate(){
    this.addForm.patchValue({
      followUpDate: this.convertDateToStrngDDMMYYYY(new Date()),
    });
  }
  clearFollowUp(){
    this.addForm.patchValue({
      followUpDate: "",
    });
  }

  convertDateToStrngDDMMYYYY(date){
    console.log(date);
    let dateCurrent = new Date();
    if(date){
      dateCurrent = new Date(date);
    }
    
    var dd = dateCurrent.getDate();
    var mm = dateCurrent.getMonth() + 1; //January is 0!
    var yyyy = dateCurrent.getFullYear();

    let month = "";
    let day = "";
    if (dd < 10) {
      day = "0" + dd;
    } else {
      day = "" + dd;
    }
    if (mm < 10) {
      month = "0" + mm;
    } else {
      month = "" + mm;
    }

    var startTime =
        (dateCurrent.getHours() < 10
        ? "0" + dateCurrent.getHours()
        : dateCurrent.getHours()) +
        "." +
        (dateCurrent.getMinutes() < 10
        ? "0" + dateCurrent.getMinutes()
        : dateCurrent.getMinutes());

    return day + "-" + month + "-" +yyyy;
  }

  input;
  status = '';
  customerGroup = '';
  symptomLevel = '';
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

    if (this.customerGroup) {
      params[`customerGroup`] = this.customerGroup;
    }

    if (this.symptomLevel) {
      params[`symptomLevel`] = this.symptomLevel;
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

    if (this.isShowFollowUp) {
      if (this.startFollowUpDate) {
        params[`startFollowUpDate`] = this.startFollowUpDate;
      }
      if (this.endFollowUpDate) {
        params[`endFollowUpDate`] = this.endFollowUpDate;
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

  dataOrigin
  openDialogDetail(data){
    this.validateUpdate = true;
    this.notifySave = false;
    this.dataOrigin = data;
    var weightRangeName = "";
    if(data.weightRange == "1.2-"){
      weightRangeName = "น้อยกว่า 1.2 kg";
    }else if(data.weightRange == "1.2-2.8"){
      weightRangeName = "1.2-2.8 kg";
    }else if(data.weightRange == "2.8-6.5"){
      weightRangeName = "2.8-6.5 kg";
    }else if(data.weightRange == "6.5-12.5"){
      weightRangeName = "6.5-12.5 kg";
    }else if(data.weightRange == "12.5+"){
      weightRangeName = "มากกว่า 12.5 kg";
    }
    this.addForm.patchValue({
      id: data.id,
      nameCat: data.nameCat,
      weightRangeName: weightRangeName,
      breeds: data.breeds,
      keyword: data.keyword,
      year: data.year,
      month: data.month,
      genderCat: data.genderCat,
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
      followUpDate: data.followUpDate,
      followUpStartTime: data.followUpStartTime,
      followUpEndTime: data.followUpEndTime,
      moreDetails: data.moreDetails,
      customerGroup: data.customerGroup,
      symptomLevel: data.symptomLevel,
      status: data.status,
      botMode: data.botMode
    });
    $('#modal-detail').modal('show');
  }

  dismissModalDetail(){
    $('#modal-detail').modal('hide');
  }

  timeMask = [/\d/, /\d/, ':', /\d/, /\d/];
  validateHhMm(inputField) {
    let isValid = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(inputField);
    return isValid;
  }

  validateUpdate = true;
  notifySave = false;
  followUpValid = false;
  followUpEndTimeIsValid = false;
  followUpStartTimeIsValid = false;
  submitted_add = false;
  patchStatusAndBotMode(){
    this.submitted_add = true;
    if(this.addForm.invalid){
      return;
    }
    if(this.addForm.value.followUpStartTime && !this.validateHhMm(this.addForm.value.followUpStartTime)){
      this.followUpStartTimeIsValid = true;
      return;
    }else{
      this.followUpStartTimeIsValid = false;
    }
    if(this.addForm.value.followUpEndTime && !this.validateHhMm(this.addForm.value.followUpEndTime)){
      this.followUpEndTimeIsValid = true;
      return;
    }else{
      this.followUpEndTimeIsValid = false;
    }
    this.followUpValid = false;
    if(this.addForm.value.followUpDate){
      if(!this.addForm.value.followUpStartTime || !this.addForm.value.followUpEndTime){
        this.warningDialog('กรุณากรอกข้อมูลให้ครบ','กรอก follow up, follow up start time, follow up end time');
        this.followUpValid = true;
        return;
      }
    }
    if(this.addForm.value.followUpStartTime){
      if(!this.addForm.value.followUpDate || !this.addForm.value.followUpEndTime){
        this.warningDialog('กรุณากรอกข้อมูลให้ครบ','กรอก follow up, follow up start time, follow up end time');
        this.followUpValid = true;
        return;
      }
    }
    if(this.addForm.value.followUpEndTime){
      if(!this.addForm.value.followUpStartTime || !this.addForm.value.followUpDate){
        this.warningDialog('กรุณากรอกข้อมูลให้ครบ','กรอก follow up, follow up start time, follow up end time');
        this.followUpValid = true;
        return;
      }
    }

    if(this.addForm.value.moreDetails != this.dataOrigin.moreDetails){
      this.validateUpdate = false;
    }
    if(this.addForm.value.customerGroup != this.dataOrigin.customerGroup){
      this.validateUpdate = false;
    }
    if(this.addForm.value.symptomLevel != this.dataOrigin.symptomLevel){
      this.validateUpdate = false;
    }
    if(this.addForm.value.followUpDate != this.dataOrigin.followUpDate){
      this.validateUpdate = false;
    }
    if(this.addForm.value.followUpStartTime != this.dataOrigin.followUpStartTime){
      this.validateUpdate = false;
    }
    if(this.addForm.value.followUpEndTime != this.dataOrigin.followUpEndTime){
      this.validateUpdate = false;
    }
    if(this.addForm.value.status != this.dataOrigin.status){
      this.validateUpdate = false;
    }
    if(this.addForm.value.botMode != this.dataOrigin.botMode){
      this.validateUpdate = false;
    }
    
    if(!this.validateUpdate && !this.notifySave){
      Swal.fire({
        title: '',
        text: "โปรดอัปเดต “ช่องสถานะเคส” ให้เป็นปัจจุบันเสมอ และหากอัปเดตแล้วสามารถกดบันทึกอีกครั้งได้เลย   ",
        type: 'warning',
        allowOutsideClick: false,
        // confirmButtonColor: '#3085d6',
        confirmButtonText: 'รับทราบ'
      }).then((result) => {
        this.notifySave = true;
      })
      return;
    }

    console.log(this.addForm.value);
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

  recommendHospitals(){
    Swal.fire({
      title: 'Are you sure?',
      text: "",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.spinner.show()
        var req = {
          consultVeterinarianId: this.addForm.value.id
        }
        this.catBotService.recommendHospitals(req).subscribe(resp => {
          this.spinner.hide()
          this.searchConsultVeterinarianByCriteriaPage()
        }, err => {
          this.spinner.hide()
          this.failDialog('')
          console.log("=== err ===")
          console.log(err)
        });
      }
    })
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

  warningDialog(title,msg){
    Swal.fire({
      type: 'warning',
      title: title,
      text: msg
    })
  }
}
