const { isTokenValid } = require('../utils/validateToken');

describe('is operator type valid', () => {
  it('returns false if operator is not + - / or x', () => {
    const token = { type: 'operator', value: 'a' };
    expect(isTokenValid(token)).toBeFalsy();

    token.value = '$';
    expect(isTokenValid(token)).toBeFalsy();

    token.value = '';
    expect(isTokenValid(token)).toBeFalsy();

    token.value = 8;
    expect(isTokenValid(token)).toBeFalsy();
  });

  it('returns true if operator is +', () => {
    const token = { type: 'operator', value: '+' };
    expect(isTokenValid(token)).toBeTruthy();
  });

  it('returns true if operator is -', () => {
    const token = { type: 'operator', value: '-' };
    expect(isTokenValid(token)).toBeTruthy();
  });

  it('returns true if operator is /', () => {
    const token = { type: 'operator', value: '/' };
    expect(isTokenValid(token)).toBeTruthy();
  });

  it('returns true if operator is x', () => {
    const token = { type: 'operator', value: 'x' };
    expect(isTokenValid(token)).toBeTruthy();
  });
});

describe('is number type valid', () => {
  it('returns true if number is sent', () => {
    const token = { type: 'number', value: 5 };
    expect(isTokenValid(token)).toBeTruthy();

    token.value = 8;
    expect(isTokenValid(token)).toBeTruthy();

    token.value = 1;
    expect(isTokenValid(token)).toBeTruthy();
  });

  it('returns false if value is not a number', () => {
    const token = { type: 'number', value: '5' };
    expect(isTokenValid(token)).toBeFalsy();

    token.value = '+';
    expect(isTokenValid(token)).toBeFalsy();
  });
});
