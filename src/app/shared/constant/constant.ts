import {Injectable} from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class Constant {

API_ENDPOINT :string;
API_DOMAIN :string;
WORK_SALE_STATUS:{};
WORK_SALE_STATUS_DASHBOARD:{};
WORK_SHEET_STATUS:{};
WORK_SHEET_STATUS_COLOR:{};
INVOICE_TYPE:{};
REQ_STATUS:{};
REQ_TYPE:{};
PO_STATUS:{};
PR_STATUS:{};

constructor() {
    this.API_ENDPOINT = environment.api_endpoint;
    this.API_DOMAIN = environment.api_domain;
    this.WORK_SALE_STATUS = {
      'D':'แบบร่าง',
      'P':'รออนุมัติใบเสนอราคา',
      'NP':'ไม่อนุมัติใบเสนอราคา',
      'CK':'รออัปโหลดเอกสาร',
      'WA':'รออนุมัติเอกสาร',
      'A':'อนุมัติ',
      'R':'ไม่อนุมัติ',
      'C':'ยกเลิก',
      'DNA':'ไม่ตอบรับใบเสนอราคา',
      'IN':'ส่งเข้าระบบ'
    }

    this.WORK_SALE_STATUS_DASHBOARD = {
      'D':'แบบร่าง',
      'P':'รออนุมัติ',
      'NP':'ไม่อนุมัติใบเสนอราคา',
      'CK':'รออัปโหลดเอกสาร',
      'WA':'รออนุมัติเอกสาร',
      'A':'อนุมัติ',
      'R':'ไม่อนุมัติ',
      'C':'ยกเลิก',
      'DNA':'ไม่ตอบรับใบเสนอราคา',
      'IN':'ส่งเข้าระบบ'
    }

    this.WORK_SHEET_STATUS = {
      'W':'รอมอบหมายงาน',
      'P':'อยู่ระหว่างดำเนินงาน',
      'O':'คงค้าง',
      'F':'เสร็จเรียบร้อย',
      'FW':'ส่งต่องาน',
      'C':'ใบงานที่ยกเลิก'
    }

    this.WORK_SHEET_STATUS_COLOR = {
      'W':'#f1c40f',
      'P':'#0abde3',
      'O':'#8395a7',
      'F':'#44bd32',
      'FW':'#27ae60',
      'C':'#d35400'
    }

    this.INVOICE_TYPE = {
      'O':'ค่าบริการตามรอบบิล',
      'W':'ใบงานอื่นๆ',
      'S':'ใบงานติดตั้ง/ติดตั้งใหม่',
      'R':'อื่นๆ'
    }

    this.REQ_STATUS = {
      'D':'แบบร่าง',
      'C':'ยกเลิก',
      'WA':'รออนุมัติ',
      'RJ':'ไม่อนุมัติ',
      'WC':'รอเบิกอุปกรณ์',
      'FPR':'เสร็จสิ้นและเปิดPR',
      'F':'เสร็จสิ้น'
    }

    this.REQ_TYPE = {
      'I':'เบิกเพื่อติดตั้ง',
      'R':'เบิกเพื่อซ่อม',
      'T':'เบิกเพื่อทดสอบ',
      'S':'เบิกเพื่อขาย',
      'B':'เบิกเพื่อยืม',
      'SP':'เบิกเพื่อสำรอง',
      'M':'เบิกของย้ายคลัง'
    } 

    this.PO_STATUS = {
      'D':'แบบร่าง',
      'WA':'รออนุมัติ',
      'A':'อนุมัติ',
      'RJ':'ไม่อนุมัติ'
    }

    this.PR_STATUS = {
      'WA':'รออนุมัติ',
      'A':'อนุมัติ',
      'RJ':'ไม่อนุมัติ'
    }

  }
}