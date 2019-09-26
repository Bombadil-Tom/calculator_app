const { calculateResult } = require('../utils/calculateResult');

it('calculcates the correct result for 2+2*7-4/4', () => {
  const tokens = [
    { value: 2 },
    { value: '+' },
    { value: 2 },
    { value: 'x' },
    { value: 7 },
    { value: '-' },
    { value: 4 },
    { value: '/' },
    { value: 4 },
  ];

  expect(calculateResult(tokens)).toEqual(15);
});

it('calculcates the correct result for -2+3/2', () => {
  const tokens = [
    { value: '-' },
    { value: 2 },
    { value: '+' },
    { value: 3 },
    { value: '/' },
    { value: 2 },
  ];

  expect(calculateResult(tokens)).toEqual(-0.5);
});
