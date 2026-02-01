import i18n from '../i18n';

/**
 * Formats a currency amount according to the current language and currency code.
 *
 * @param amount The numerical amount to format.
 * @param currency The currency code (e.g., 'USD', 'PLN', 'ARRR').
 * @returns A localized string representation of the price.
 */
export const formatPrice = (amount: number, currency: string): string => {
  const locale = i18n.language || 'en-US';

  try {
    // Attempt to use the native Intl.NumberFormat for standard fiat currencies.
    // This will handle symbol placement and localized decimal/thousands separators.
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch {
    // Fallback for non-standard or crypto currencies (e.g., ARRR, YEC) 
    // that might not be recognized by the Intl API.
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 8, // Allow more precision for crypto
    }).format(amount);

    // Apply the same placement logic: symbol/code before for en-US, after for pl-PL.
    if (locale.startsWith('en')) {
      return `${currency} ${formattedNumber}`;
    } else {
      return `${formattedNumber} ${currency}`;
    }
  }
};

/**
 * Returns currency symbol and whether it should be a prefix based on current language.
 */
export const getCurrencyFormatInfo = (currency: string): { symbol: string; isPrefix: boolean } => {
  const locale = i18n.language || 'en-US';

  try {
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    });
    
    const parts = formatter.formatToParts(1);
    const symbolPart = parts.find(p => p.type === 'currency');
    const symbol = symbolPart ? symbolPart.value : currency;
    
    const currencyIndex = parts.findIndex(p => p.type === 'currency');
    const numberIndex = parts.findIndex(p => p.type === 'integer' || p.type === 'decimal');
    
    return {
      symbol,
      isPrefix: currencyIndex < numberIndex
    };
  } catch {
    return {
      symbol: currency,
      isPrefix: locale.startsWith('en')
    };
  }
};
