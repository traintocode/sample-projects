import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import classes from './App.module.css';
import ConversionBlock from './ConversionBlock';
import { ExchangeRatesDictionary, getRatesForCurrency } from './ExchangeRateApiClient';
import { Currency, currencyDictionary } from './types';
import { ArrowRightOutlined, ArrowDownOutlined } from '@ant-design/icons';


function App() {
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencyDictionary.USD);
  const [toCurrency, setToCurrency] = useState<Currency>(currencyDictionary.GBP);
  const [values, setValues] = useState<string[]>(['1.00', '0.00']);
  const [rates, setRates] = useState<ExchangeRatesDictionary | null>(null);

  useEffect(() => {
    const setNewRates = async () => {
      const newRates = await getRatesForCurrency(fromCurrency.code);
      setRates(newRates);
      const convertedToValue = newRates[toCurrency.code] * parseFloat(values[0]);
      setValues([values[0], convertedToValue.toFixed(2)]);
    }
    setNewRates();
  }, [fromCurrency]);

  const updateFromValue = (value: string) => {
    if (!rates) return;
    const convertedToValue = parseFloat(value) * rates[toCurrency.code];
    setValues([value, convertedToValue.toFixed(2)]);
  }
  const updateToValue = (value: string) => {
    if (!rates) return;
    const convertedFromValue =  parseFloat(value) / rates[toCurrency.code];
    setValues([convertedFromValue.toFixed(2), value]);
  }


  return (
    <div className={classes.app}>
      <h1 className={classes.title}>Currency Converter</h1>
      <p className={classes.subtitle}>Enter a value to convert currency</p>
      <main className={classes.blockContainer}>
        <ConversionBlock
          className={classes.block}
          id="fromCurrency"
          selectedCurrency={fromCurrency}
          value={values[0]}
          onInputChange={updateFromValue}
          currencyOptions={Object.values(currencyDictionary)}
          onCurrencyChange={code => setFromCurrency(currencyDictionary[code])}
        />
        <div className={classes.divider}><ArrowRightOutlined className={classes.arrowRight} /><ArrowDownOutlined className={classes.arrowDown} /></div>
        <ConversionBlock
          className={classes.block}
          id="toCurrency"
          selectedCurrency={toCurrency}
          onCurrencyChange={code => setToCurrency(currencyDictionary[code])}
          value={values[1]}
          onInputChange={updateToValue}
          currencyOptions={Object.values(currencyDictionary)}
        />
      </main>
      <div className={classes.flexFill}></div>
      <footer className={classes.footer}>
        <a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
      </footer>
    </div>
  )
}

export default App
