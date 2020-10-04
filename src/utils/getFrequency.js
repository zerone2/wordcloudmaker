export const getFrequency = (string) => {
  const textArray = []
  const splitResult = string.trim().split(/\s+/).reduce((total, word) => {
    if(total[word]) {
      total[word] ++
    } else {
      total[word] = 1
    }
    return total
  }, {})
  Object.getOwnPropertyNames(splitResult).forEach((key, index) => {
    textArray.push({
      text: key,
      value: splitResult[key]
    })
  })
  return textArray
}
export const getFrequency2 = (string, cutOff) => {
  let cleanString = string.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,""),
    words = cleanString.split(' '),
    frequencies = {},
    word, frequency, i;
  for( i=0; i<words.length; i++ ) {
    word = words[i];
    frequencies[word] = frequencies[word] || 0;
    frequencies[word]++;
  }
  words = Object.keys( frequencies );
  return words.sort(function (a,b) { return frequencies[b] -frequencies[a];}).slice(0,cutOff).toString();
}
