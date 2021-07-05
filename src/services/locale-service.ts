// default locale to english in Canada for now
// set sensible defaults with the ability to override when needed
let locale = 'en-CA';

function setLocale(newLocale: string) {
  locale = newLocale;
}

function getDate(dateString: string, options?: Intl.DateTimeFormatOptions) {
  const value = new Date(dateString);
  if (Number.isNaN(value.getTime())) return 'Invalid Date format';

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(value);
}

// assuming that the rounding rules are acceptable
// otherwise we can truncate the number
function getCurrencyNumber(
  numberString: string | number,
  options?: Intl.NumberFormatOptions
): string | null {
  const value = Number(numberString);
  if (Number.isNaN(value)) return null;

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
