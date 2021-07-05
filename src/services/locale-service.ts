// default locale to english in Canada for now
// set sensible defaults with the ability to override when needed
let locale = 'en-CA';

function setLocale(newLocale: string) {
  locale = newLocale;
}

function getDate(value: Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(value);
}

// assuming that the rounding rules are acceptable
// otherwise we can truncate the number
function getCurrencyNumber(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'CAD',
    ...options,
  }).format(value);
}

const NumberService = {
  getCurrencyNumber,
};

const DateService = {
  getDate,
};

export { setLocale, NumberService, DateService };
