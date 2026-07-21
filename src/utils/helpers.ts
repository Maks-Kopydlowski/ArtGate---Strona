export const getReviewsWord = (count: number): string => {
  if (count === 1) return 'opinia';
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits >= 20)) {
    return 'opinie';
  }
  return 'opinii';
};

export const formatPhone = (input: string): string => {
  const clean = input.replace(/[^\d+]/g, '');
  if (!clean) return '';
  
  const hasPlus = clean.startsWith('+');
  const digitsOnly = hasPlus ? clean.slice(1) : clean;
  
  if (digitsOnly.length === 0) {
    return hasPlus ? '+' : '';
  }
  
  const getCountryCodeLength = (digits: string): number => {
    if (digits.startsWith('1') || digits.startsWith('7')) {
      return 1;
    }
    const twoDigitCodes = [
      '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
      '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84',
      '86', '90', '91', '92', '93', '94', '95', '98'
    ];
    const prefix2 = digits.slice(0, 2);
    if (twoDigitCodes.includes(prefix2)) {
      return 2;
    }
    return Math.min(digits.length, 3);
  };

  const chunkString = (str: string, size: number): string[] => {
    const chunks: string[] = [];
    for (let i = 0; i < str.length; i += size) {
      chunks.push(str.slice(i, i + size));
    }
    return chunks;
  };

  if (hasPlus) {
    const ccLen = getCountryCodeLength(digitsOnly);
    const cc = digitsOnly.slice(0, ccLen);
    const rest = digitsOnly.slice(ccLen);
    const formattedRest = chunkString(rest, 3).join(' ');
    return `+${cc}${formattedRest ? ' ' + formattedRest : ''}`;
  } else {
    return chunkString(digitsOnly, 3).join(' ');
  }
};
