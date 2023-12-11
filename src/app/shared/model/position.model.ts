import { Department } from './department.model'

export class Position {
    id: BigInteger
    positionName: string
    description: string
    parent: BigInteger
    isDeleted: boolean
    createdDate: Date
    createdBy: string
    updatedDate: Date
    updatedBy: string
    departmentId: BigInteger
  }