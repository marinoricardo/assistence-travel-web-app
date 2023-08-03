export interface ExchangeRate {
    success: boolean
    timestamp: number
    base: string
    date: string
    rates: Rates
  }
  
  export interface Rates {
    USD: number
    MZN: number
    ZAR: number
    AUD: number
    CAD: number
    GBP: number
    JPY: number
  }
  