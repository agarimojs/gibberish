const { isGibberish } = require('../src');

describe('Gibberish', () => {
  describe('isGibberish', () => {
    test('Should return false for good sentences', () => {
      expect(isGibberish('This sentence is totally valid.')).toBeFalsy();
      expect(isGibberish('This is not gibberish')).toBeFalsy();
      expect(isGibberish('Esta frase es totalmente correcta')).toBeFalsy();
      expect(isGibberish('goodbye')).toBeFalsy();
      expect(isGibberish('sure')).toBeFalsy();
      expect(isGibberish('very much')).toBeFalsy();
      expect(isGibberish('it feels so good')).toBeFalsy();
      expect(
        isGibberish(
          'Qué tiene la zarzamora que a todas horas llora que llora por los rincones'
        )
      ).toBeFalsy();
      expect(isGibberish('are we human?')).toBeFalsy();
      expect(isGibberish('or are we dancers?')).toBeFalsy();
    });

    test('Should return true for gibberish sentences', () => {
      expect(isGibberish('zxcvwerjasc')).toBeTruthy();
      expect(isGibberish('ertrjiloifdfyyoiu')).toBeTruthy();
      expect(isGibberish('ajgñsgj ajdskfig jskf')).toBeTruthy();
      expect(
        isGibberish('euzbfdhuifdgiuhdsiudvbdjibgdfijbfdsiuddsfhjibfsdifdhbfd')
      ).toBeTruthy();
      expect(isGibberish('nmnjcviburili,<>')).toBeTruthy();
      expect(isGibberish('ubkddhepwxfzmpc')).toBeTruthy();
      expect(isGibberish('kwinsghocyevlzep')).toBeTruthy();
      expect(isGibberish('ertrjiloifdfyyoiu')).toBeTruthy();
      expect(isGibberish('asddsa adsdsa asdadsasd')).toBeTruthy();
      expect(isGibberish('ioqwioeioqwe')).toBeTruthy();
    });
  });
});
