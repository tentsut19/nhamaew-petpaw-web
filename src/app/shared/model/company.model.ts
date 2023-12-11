import { Address } from './address.model'
import { Contact } from './contact.model'
export class Company {
    id: BigInteger
    companyName: string
    taxId: string
    vat: number
    invCredit: BigInteger
    parent: BigInteger
    isCalDay: boolean
    pathLogo: string
    isDeleted: boolean
    createdDate: Date
    createdBy: string
    updatedDate: Date
    updatedBy: string
    addressDetail: string
    mobile: string
    email: string
    fax: string
  }