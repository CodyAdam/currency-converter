export default function RatesDisplay({ rates }: { rates: Map<string, number> }) {
  return (
    <div className='hidden sm:flex flex-col gap-3 text-right p-5 pr-0 bg-white border rounded-l-2xl shadow-xl'>
      <h1 className='text-xl font-bold pr-5'>Rates</h1>
      <div className='text-xs max-h-[50vh] overflow-y-auto pr-5'>
        {Array.from(rates.entries()).map(([currency, rate]) => (
          <div key={currency}>
            {currency} : {rate}
          </div>
        ))}
      </div>
    </div>
  );
}
