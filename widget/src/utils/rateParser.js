export default function currencyParser(data) {
  const from = data.from.split('/');
  const to = data.to.split('/');

  return {
    amountFrom: Number(from[0]),
    amountTo: Number(to[0]),
    currencyFrom: from[1],
    currencyTo: to[1],
    exchangeFee: data.feePercent,
    exchangeRate: data.rate,
    minerFee: data.minerFee,
  };
}
