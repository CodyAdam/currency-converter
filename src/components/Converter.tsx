import { QueryClient, useMutation } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { currencies } from '../utils/currencies';
import CurrencyInput from './CurrencyInput';
import MdiCompareVertical from './icons/MdiCompareVertical';
import SvgSpinners90RingWithBg from './icons/SvgSpinners90RingWithBg';
import RatesDisplay from './RatesDisplay';

const API_URL = 'http://api.nbp.pl/api/exchangerates/rates';
// http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json
// response :
// {"table":"A","currency":"funt szterling","code":"GBP","rates":[{"no":"033/A/NBP/2023","effectiveDate":"2023-02-16","mid":5.3772}]}

export default function Converter() {
  const [price1, setPrice1] = useState(0);
  const [currency1, setCurrency1] = useState('USD');
  const [price2, setPrice2] = useState(0);
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState(new Map<string, number>());
  const mutationAddRates = useMutation({
    mutationFn: async (currency: string) => {
      let response = await fetch(`${API_URL}/a/${currency}/?format=json`);
      if (!response.ok) response = await fetch(`${API_URL}/b/${currency}/?format=json`);
      const data = await response.json();
      setRates((prevRates) => {
        const newRates = new Map(prevRates);
        newRates.set(currency, data.rates[0].mid);
        return newRates;
      });
    },
  });

  function updatePrice1FromPrice2() {
    if (!rates.has(currency1) || !rates.has(currency2)) return;
    setPrice1((price2 * rates.get(currency2)!) / rates.get(currency1)!);
  }

  function updatePrice2FromPrice1() {
    if (!rates.has(currency1) || !rates.has(currency2)) return;
    setPrice2((price1 * rates.get(currency1)!) / rates.get(currency2)!);
  }

  useEffect(() => {
    mutationAddRates.mutate(currency1, { onSuccess: () => updatePrice2FromPrice1() });
  }, [currency1]);

  useEffect(() => {
    mutationAddRates.mutate(currency2, { onSuccess: () => updatePrice1FromPrice2() });
  }, [currency2]);

  useEffect(() => {
    updatePrice2FromPrice1();
  }, [price1]);

  useEffect(() => {
    updatePrice1FromPrice2();
  }, [price2]);

  return (
    <div className='flex flex-col items-center justify-center h-full p-5'>
      <div className='absolute right-0'>
        <RatesDisplay rates={rates} />
      </div>
      <div className='backdrop-blur-sm bg-white/50 p-8 rounded-3xl border  shadow-xl flex gap-3 flex-col items-center w-full max-w-sm'>
        {rates.get(currency1) && rates.get(currency2) && (
          <h1 className='flex items-center justify-center gap-3 pb-3 text-xl'>
            <div className='font-semibold text-right'>
              {price1.toFixed(2)} {currency1}
            </div>
            <div className='font-black text-blue-500'>=</div>
            <div className='font-semibold'>
              {price2.toFixed(2)} {currency2}
            </div>
          </h1>
        )}
        <CurrencyInput
          value={price1}
          setValue={(newValue) => setPrice1(newValue)}
          currency={currency1}
          setCurrency={(newCurrency) => setCurrency1(newCurrency)}
          errorMessage={
            rates.get(currency1) || mutationAddRates.isLoading
              ? undefined
              : `No rate information found for ${currency1} (${currencies[currency1].name})`
          }
        />
        {mutationAddRates.isLoading ? (
          <SvgSpinners90RingWithBg className='text-blue-500 h-6 w-6 mt-5' />
        ) : (
          <MdiCompareVertical className='h-6 w-6 mt-5 text-blue-500' />
        )}
        <CurrencyInput
          value={price2}
          setValue={(newValue) => setPrice2(newValue)}
          currency={currency2}
          setCurrency={(newCurrency) => setCurrency2(newCurrency)}
          errorMessage={
            rates.get(currency2) || mutationAddRates.isLoading
              ? undefined
              : `No rate information found for ${currency2} (${currencies[currency2].name})`
          }
        />
      </div>
    </div>
  );
}
