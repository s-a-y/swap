export default function currencyParser(data) {
  const precision = Math.ceil(Math.log10(data.rate));
  return {
    amountFrom: Number(data.fromAmount),
    amountTo: Number(data.toAmount),
    currencyFrom: data.fromAsset,
    currencyTo: data.toAsset,
    exchangeFee: Math.round(data.feePercent * 10000) / 100,
    exchangeRate: (precision > 0 ?
      Number(data.rate).toPrecision(precision) : Number(data.rate).toPrecision(8 + precision)),
    minerFee: `${data.minerFee} ${data.toAsset}`,
  };
}
