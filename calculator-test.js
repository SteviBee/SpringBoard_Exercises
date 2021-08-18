
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 350000, rate: 2.5, years: 30})).toEqual("2444.13");
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({amount: 350000, rate: 2.5, years: 30})).toContain(".13");
});

/// etc


// it('should calculate lower-bracket taxes', function () {
//   expect(calculateTaxes(10000)).toEqual(1500);
//   expect(calculateTaxes(20000)).toEqual(3000);
// });
