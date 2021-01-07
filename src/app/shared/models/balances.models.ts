export interface BalanceModel {
  name: string,
  debts: DebtModel[]
}

export interface DebtModel {
  owes: number,
  to: string
}
