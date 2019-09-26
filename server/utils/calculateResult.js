const createStr = (tokens) => {
  const valueArr = tokens.map((token) => token.value);

  return valueArr.join('').replace(/x/gi, '*');
};

const calculateResult = (tokens) => {
  const resultStr = createStr(tokens);

  const result = eval(resultStr);

  return result.toFixed(2);
};

module.exports = { calculateResult };
