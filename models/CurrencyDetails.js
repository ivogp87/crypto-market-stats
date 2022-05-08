class CurrencyDetails {
  constructor(symbol, name, logoUrl) {
    this.symbol = symbol;
    this.name = name;
    this.logoUrl = logoUrl || '';
  }
}

export default CurrencyDetails;
