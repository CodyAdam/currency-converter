import { getRateOf } from './api-fetch';

describe('getRateOf', () => {
  test('returns data when API call is successful', async () => {
    const currency = 'USD';
    const expectedData = {
      /* expected data object */
    };
    const mockResponse = { ok: true, json: jest.fn(() => Promise.resolve(expectedData)) };
    global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as any;

    const data = await getRateOf(currency);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`);

    expect(data).toEqual(expectedData);
  });

  test('attempts alternate API call when first call fails', async () => {
    const currency = 'USD';
    const expectedData = {
      /* expected data object */
    };
    const mockFailedResponse = { ok: false };
    const mockSuccessfulResponse = { ok: true, json: jest.fn(() => Promise.resolve(expectedData)) };
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(mockFailedResponse))
      .mockImplementationOnce(() => Promise.resolve(mockSuccessfulResponse));

    const data = await getRateOf(currency);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as any).mock.calls[0][0]).toEqual(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`,
    );
    expect((global.fetch as any).mock.calls[1][0]).toEqual(
      `https://api.nbp.pl/api/exchangerates/rates/b/${currency}/?format=json`,
    );

    expect(data).toEqual(expectedData);
  });

  test('throws an error when both API calls fail', async () => {
    const currency = 'USD';
    const mockFailedResponse = { ok: false };
    global.fetch = jest.fn(() => Promise.resolve(mockFailedResponse)) as any;

    await expect(getRateOf(currency)).rejects.toThrow();

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect((global.fetch as any).mock.calls[0][0]).toEqual(
      `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`,
    );
    expect((global.fetch as any).mock.calls[1][0]).toEqual(
      `https://api.nbp.pl/api/exchangerates/rates/b/${currency}/?format=json`,
    );
  });
});
