# gibberish
Detect if a sentence is gibberish

```javascript


const { isGibberish } = require('@agarimo/gibberish');

isGibberish('This sentence is totally valid.'); // false
isGibberish('This is not gibberish'); // false
isGibberish('Esta frase es totalmente correcta'); // false
isGibberish('goodbye'); // false
isGibberish('sure'); // false
isGibberish('very much'); // false
isGibberish('it feels so good'); // false
isGibberish('Qué tiene la zarzamora que a todas horas llora que llora por los rincones'); // false
isGibberish('are we human?'); // false
isGibberish('or are we dancers?'); // false

isGibberish('zxcvwerjasc'); // true
isGibberish('ertrjiloifdfyyoiu'); // true
isGibberish('ajgñsgj ajdskfig jskf'); // true
isGibberish('euzbfdhuifdgiuhdsiudvbdjibgdfijbfdsiuddsfhjibfsdifdhbfd'); // true
isGibberish('nmnjcviburili,<>'); // true
isGibberish('ubkddhepwxfzmpc'); // true
isGibberish('kwinsghocyevlzep'); // true
isGibberish('ertrjiloifdfyyoiu'); // true
isGibberish('asddsa adsdsa asdadsasd'); // true
isGibberish('ioqwioeioqwe'); // true
```