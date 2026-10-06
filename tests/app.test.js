const test = require('node:test');
const assert = require('node:assert/strict');

// app.js is primarily a browser script. These minimal globals prevent its
// DOMContentLoaded registration from executing during Node-based unit tests.
global.document = { addEventListener: () => {} };
global.window = { addEventListener: () => {} };

const {
  convertLandToAcres,
  calculateOrderTotals,
  getDiseaseInfo
} = require('../app.js');

test('convertLandToAcres keeps acres unchanged', () => {
  assert.equal(convertLandToAcres(2, 'Acres'), 2);
});

test('convertLandToAcres converts bigha using the application factor', () => {
  assert.equal(convertLandToAcres(5, 'Bigha'), 2);
});

test('convertLandToAcres converts hectares to acres', () => {
  assert.equal(convertLandToAcres(1, 'Hectares'), 2.47);
});

test('convertLandToAcres rejects invalid area', () => {
  assert.throws(() => convertLandToAcres(-1, 'Acres'), /non-negative/);
  assert.throws(() => convertLandToAcres('abc', 'Acres'), /non-negative/);
});

test('calculateOrderTotals computes subsidy and village discount', () => {
  const result = calculateOrderTotals([
    { mrp: 1000, price: 800, qty: 2 }
  ], true);

  assert.equal(result.subtotal, 2000);
  assert.equal(result.totalSubsidy, 400);
  assert.equal(result.villageDiscount, 288);
  assert.equal(result.finalPayable, 1312);
});

test('calculateOrderTotals does not apply village discount when disabled', () => {
  const result = calculateOrderTotals([
    { mrp: 1000, price: 800, qty: 2 }
  ], false);

  assert.equal(result.villageDiscount, 0);
  assert.equal(result.finalPayable, 1600);
});

test('calculateOrderTotals supports an empty cart', () => {
  assert.deepEqual(calculateOrderTotals([], true), {
    subtotal: 0,
    totalSubsidy: 0,
    villageDiscount: 0,
    finalPayable: 0
  });
});

test('calculateOrderTotals rejects malformed cart items', () => {
  assert.throws(
    () => calculateOrderTotals([{ mrp: 100, price: 'bad', qty: 1 }], false),
    /invalid item/
  );
});

test('getDiseaseInfo returns the requested diagnosis', () => {
  const result = getDiseaseInfo('cotton_bollworm');

  assert.equal(result.crop, 'Cotton');
  assert.equal(result.productId, 'pest-neem-1');
});

test('getDiseaseInfo falls back to rice blast for an unknown type', () => {
  const result = getDiseaseInfo('unknown');

  assert.equal(result.disease, 'Rice Leaf Blast (Magnaporthe oryzae)');
});
