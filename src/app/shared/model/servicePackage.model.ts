export class ServicePackage {
    id: BigInteger
    packageCode: string
    packageName: string
    installationFee: number
    deposit: number
    isMonthlyService: boolean
    mounthlyServiceFee: number
    perMounth: BigInteger
    firstBillFee: number
    firstBillFreeDiscount: number
    oneServiceFee: number
    isActive: boolean
    isDeleted: boolean
    createdDate: Date
    createdBy: string
    updatedDate: Date
    updatedBy: string
    companyId: BigInteger
    serviceTypeId: BigInteger
  }