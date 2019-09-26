const isOperator = ({ type }) => type === 'operator';
const isNumber = ({ type }) => type === 'number';

const isValidNumber = (num) => typeof (num) === 'number';
const isValidOperator = (value) => value === '+' || value === '-' || value === '/' || value === 'x';

const isTokenValid = (token) => {
  if (isNumber(token)) {
    return isValidNumber(token.value);
  }

  if (isOperator(token)) {
    return isValidOperator(token.value);
  }

  return false;
};


const isTokenTypeCorrect = (tokens, newToken) => {
  if (tokens.length === 0) {
    if (isOperator(newToken)) {
      if (newToken.value === '*' || newToken.value === '/') { return false; }
    }
    return true;
  }

  const lastToken = tokens[tokens.length - 1];

  if (isOperator(lastToken) && isOperator(newToken)) {
    return false;
  }

  return true;
};

module.exports = { isTokenValid, isTokenTypeCorrect };
