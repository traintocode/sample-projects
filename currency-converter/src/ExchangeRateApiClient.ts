import { CurrencyCode } from "./types";

export async function getRatesForCurrency(code: CurrencyCode): Promise<ExchangeRatesDictionary> {
    const response = await fetch(`https://open.er-api.com/v6/latest/${code}`);
    const responseJson = (await response.json() as ExchangeRateApiResponse);
    return responseJson.rates;
}

type ExchangeRateApiResponse = {
	result: string,
	rates: ExchangeRatesDictionary
}

export type ExchangeRatesDictionary = {
    [code in CurrencyCode]: number
}
