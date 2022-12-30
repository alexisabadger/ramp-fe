import {
  PaginatedRequestParams,
  PaginatedResponse,
  RequestByEmployeeParams,
  SetTransactionApprovalParams,
  Transaction,
  Employee,
} from "./types"
import {
  useEndOfTransactions
} from "../hooks/useEndOfTransactions"
import { useState } from "react"
import mockData from "../mock-data.json"

let TRANSACTIONS_PER_PAGE = 5

const data: { employees: Employee[]; transactions: Transaction[] } = {
  employees: mockData.employees,
  transactions: mockData.transactions,
}

export const getEmployees = (): Employee[] => data.employees



export const getTransactionsPaginated = ({
  page,
}: PaginatedRequestParams): PaginatedResponse<Transaction[]> => {

  if (page === null) {
    throw new Error("Page cannot be null")
  }

  let endOfTransactions = false

  const start = 0
  let end = TRANSACTIONS_PER_PAGE + (page * TRANSACTIONS_PER_PAGE)

  if (end >= data.transactions.length) {
    end = data.transactions.length - 1
    endOfTransactions = true
  }

  const nextPage = end < data.transactions.length ? page + 1 : page

  return {
    nextPage,
    data: data.transactions.slice(start, end),
    endOfTransactions
  }
}

export const getTransactionsByEmployee = ({ employeeId }: RequestByEmployeeParams) => {
  if (!employeeId) {
    throw new Error("Employee id cannot be empty")
  }

  return data.transactions.filter((transaction) => transaction.employee.id === employeeId)
}

export const setTransactionApproval = ({ transactionId, value }: SetTransactionApprovalParams): void => {
  const transaction = data.transactions.find(
    (currentTransaction) => currentTransaction.id === transactionId
  )

  if (!transaction) {
    throw new Error("Invalid transaction to approve")
  }

  transaction.approved = value
}
