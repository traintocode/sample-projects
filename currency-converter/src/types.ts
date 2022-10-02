import currencyCodes from './currency-codes.json'

export type CurrencyCode = keyof typeof currencyCodes;

export type Currency = {
    code: CurrencyCode,
    name: string,
    country: string
}

type CurrencyCodeDictionary = {
    [code in CurrencyCode]: Currency
}

export const currencyDictionary = <CurrencyCodeDictionary>currencyCodes;