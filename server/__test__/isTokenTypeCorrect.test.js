const { isTokenTypeCorrect } = require('../utils/validateToken');

it('returns true when array is empty', () => {
  const token = { type: 'number', value: 5 };
  const tokenArr = [];
  expect(isTokenTypeCorrect(tokenArr, token)).toBeTruthy();

  const newToken = { type: 'operator', value: '+' };
  expect(isTokenTypeCorrect(tokenArr, newToken)).toBeTruthy();
});

it('returns true when order is correct', () => {
  const tokenArr = [{ type: 'number', value: 5 }];
  const token1 = { type: 'operator', value: '+'};
  expect(isTokenTypeCorrect(tokenArr, token1)).toBeTruthy();

  const token2 = { type: 'number', value: 7};
  expect(isTokenTypeCorrect(tokenArr, token2)).toBeTruthy();

  const token3 = { type: 'operator', value: '-'};
  expect(isTokenTypeCorrect(tokenArr, token3)).toBeTruthy();
});

it('returns false when two operators are selected in a row', () => {
  const tokenArr = [{ type: 'operator', value: '+' }];
  const token = { type: 'operator', value: '-'};
  expect(isTokenTypeCorrect(tokenArr, token)).toBeFalsy();
});
