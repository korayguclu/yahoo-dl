import mockAxios from 'axios';
import getPriceData from './getPriceData';

const priceData = `Date,Open,High,Low,Close,Adj Close,Volume
2016-10-24,215.000000,215.320007,211.710007,212.539993,204.589417,420237800
2016-10-31,212.929993,213.190002,208.380005,208.550003,200.748672,485446500
2016-11-07,208.550003,218.309998,208.550003,216.419998,208.324280,743158200
2016-11-14,217.029999,219.270004,215.720001,218.500000,210.326462,404338000
2016-11-21,219.169998,221.559998,219.000000,221.520004,213.233505,232394000`

test('Calls yahoo url correctly with B cookie header.', async () => {
    // setup
    (mockAxios.get as any).mockImplementationOnce(() =>
        Promise.resolve({
            data: priceData,
        })
    );

    const data = await getPriceData('http://test.com', 'mycookie');
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith('http://test.com',
        { headers: { Cookie: "B=mycookie" } });
});

