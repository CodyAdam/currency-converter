export const API_URL = 'http://api.nbp.pl/api/exchangerates/rates';

export const getRateOf = async (currency: string) => {
  let response = await fetch(`${API_URL}/a/${currency}/?format=json`);
  if (!response.ok) response = await fetch(`${API_URL}/b/${currency}/?format=json`);
  const data = await response.json();
  return data;
}