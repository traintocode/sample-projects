import CurrencyInput from "react-currency-input-field";
import { Currency, CurrencyCode } from "./types";
import classes from './ConversionBlock.module.css';
type Props = {
    className?: string,
    id: string,
    value: string,
    onInputChange: (value: string) => void
    selectedCurrency: Currency,
    onCurrencyChange: (value: CurrencyCode) => void;
    currencyOptions: Currency[]
}


const ConversionBlock: React.FC<Props> = (props: Props) => {
    return <section className={props.className}>
        <select
            className={[classes.control, classes.select].join(' ')}
            value={props.selectedCurrency.code}
            onChange={e => props.onCurrencyChange(e.currentTarget.value as CurrencyCode)}>
            {props.currencyOptions.map(item => <option key={item.code} value={item.code}>{item.code} {item.name}</option>)}
        </select>
        <CurrencyInput
            className={[classes.control, classes.input].join(' ')}
            intlConfig={{ locale: 'en-US', currency: props.selectedCurrency.code }}
            id={props.id}
            name={props.id}
            placeholder="Enter a value"
            value={props.value}
            decimalsLimit={2}
            fixedDecimalLength={2}
            onValueChange={(value) => props.onInputChange(value || '0.00')}
        />
    </section>
}

export default ConversionBlock;