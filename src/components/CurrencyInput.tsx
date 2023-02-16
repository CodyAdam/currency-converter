import { useEffect, useState } from 'react';
import { currencies } from '../utils/currencies';

export default function CurrencyInput({
  value,
  setValue,
  currency,
  setCurrency,
  errorMessage,
}: {
  value: number;
  setValue: (value: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  errorMessage?: string;
}) {
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (!valid && !isNaN(value)) setValid(true);
  }, [value]);

  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-gray-700'>Price in {currencies[currency].name}</label>
      <div className='mt-1 flex rounded-md shadow-sm relative'>
        <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
          {currencies[currency].symbol_native}
        </span>
        <input
          type='text'
          name='price'
          id='price'
          className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm focus:ring-indigo-500 ${
            !valid ? 'border-red-500 text-red-700 bg-red-100 placeholder:text-red-700' : 'border-gray-300 '
          }`}
          placeholder='Type a price'
          value={value || ''}
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            if (isNaN(newValue) || newValue < 0) {
              setValid(false);
              setValue(NaN);
              return;
            }

            setValue(newValue);
            setValid(true);
          }}
        />
        <div className='absolute inset-y-0 right-0 flex items-center'>
          <label className='sr-only'>Currency</label>
          <select
            name='currency'
            value={currency}
            placeholder='Type a price'
            onChange={(e) => setCurrency(e.target.value)}
            className='focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md'
          >
            {Object.keys(currencies).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>
      {errorMessage && (
        <p className='mt-2 text-sm text-red-600' id='email-error'>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
