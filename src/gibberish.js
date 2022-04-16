function getMeasures(tokens, settings) {
  const freqs = {
    length: 0,
    words: tokens.length,
    vowels: 0,
    consonants: 0,
    uniqueChars: 0,
  };
  const vowels = settings.vowels || { a: 1, e: 1, i: 1, o: 1, u: 1, y: 1 };
  const chars = {};
  for (let i = 0; i < tokens.length; i += 1) {
    freqs.length += tokens[i].length;
    [...tokens[i]].forEach((char) => {
      if (vowels[char]) {
        freqs.vowels += 1;
      } else {
        freqs.consonants += 1;
      }
      chars[char] = 1;
    });
  }
  freqs.uniqueChars = Object.keys(chars).length;
  freqs.vowelFreq = freqs.vowels / freqs.length;
  freqs.consonantFreq = freqs.consonants / freqs.length;
  freqs.uniqueFreq = freqs.uniqueChars / freqs.length;
  freqs.wordCharFreq = freqs.words / freqs.length;
  freqs.vowelOverConsonant =
    freqs.consonants > 0 ? freqs.vowels / freqs.consonants : 0;
  return freqs;
}

function getDeviation(value, lower, upper) {
  if (value < lower) {
    const logDelta = Math.log(lower - value);
    return logDelta === 0 ? 1 : Math.log(Math.abs(lower)) / logDelta;
  }
  if (value > upper) {
    const logDelta = Math.abs(Math.log(value - upper));
    if (logDelta === 0) {
      return 1;
    }
    return Math.log(upper) / logDelta;
  }
  return 0;
}

function getGibberishScore(text, settings = {}) {
  if (text.length < (settings.minLength || 6)) {
    return 0;
  }
  const normalize =
    settings.normalize ||
    ((str) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase());
  const split = settings.split || ((str) => str.split(/[\s,.!?;:([\]'"¡¿)/]+/));
  const tokens = split(
    normalize(text.slice(0, settings.maxLength || 32))
  ).filter((x) => x);
  const measures = getMeasures(tokens, settings);
  const deviations = {
    vowel: getDeviation(
      measures.vowelFreq,
      settings.vowelDeviationLower || 0.35,
      settings.vowelDeviationUpper || 0.7
    ),
    unique: getDeviation(
      measures.uniqueFreq,
      settings.uniqueDeviationLower || 0.5,
      settings.uniqueDeviationUpper || 0.9
    ),
    wordChar: getDeviation(
      measures.wordCharFreq,
      settings.wordCharDeviationLower || 0.15,
      settings.wordCharDeviationUpper || 0.4
    ),
  };
  return Math.min(
    1,
    deviations.unique + deviations.vowel + deviations.wordChar
  );
}

function isGibberish(text, settings = {}) {
  return getGibberishScore(text, settings) > (settings.threshold || 0.5);
}

module.exports = {
  isGibberish,
  getGibberishScore,
};
