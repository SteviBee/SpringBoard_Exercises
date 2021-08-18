describe("Payments test (with setup and tear-down)", function() {
    beforeEach(function () {
    // initialization logic - for EACH test function 
        billAmtInput.value = 100;
        tipAmtInput.value = 50;
  
    });  
    //  Testing submitPaymentInfo() - for adding payments
    it('Checks that submitPaymentInfo actually adds something', function () {
        createCurPayment();
        submitPaymentInfo();
  
        expect(Object.keys(allPayments).length).toEqual(1);
        // Solutions -     expect(allPayments['payment1'].billAmt).toEqual('100');
        expect(allPayments['payment' + paymentId]).toEqual({billAmt: "100", tipAmt: "50", tipPercent: 50});
    });

    //  Testing createCurPayment(); - for adding correct values
    it('Testing createCurPayment(); - for adding correct values', function () {
            
        expect(createCurPayment()).toEqual({billAmt: "100", tipAmt: "50", tipPercent: 50});
    });

    //  Testing createCurPayment(); - for empty
    it('Testing createCurPayment(); - for empty', function () {
        billAmtInput.value = "";
        createCurPayment();
    
        expect(createCurPayment()).toEqual();
    });

    it('Testing appendPaymentTable(); - that it appends values ', function () {
        // Call the functions that will create the values and append the HTML
        appendPaymentTable(createCurPayment())
        
        expect(paymentTbody.innerHTML).toContain("$100")
        expect(paymentTbody.innerHTML).toContain("$50")
        expect(paymentTbody.innerHTML).toContain("50%")
        expect(paymentTbody.innerHTML).toContain("tr")
    });

    it("Testing updateSummary() - that it adds all the correct values ", function () {
        submitPaymentInfo()

        expect(summaryTds[0].innerHTML).toEqual("$100");
        expect(summaryTds[1].innerHTML).toEqual("$50");
        expect(summaryTds[2].innerHTML).toEqual("50%");

        
    })
    it("Testing updateSummary() - no payments makes tips % = 0 ", function () {
        allPayments = {};
        updateSummary();

        expect(summaryTds[2].innerHTML).toEqual("0%");
        
    })

    afterEach(function() {
      // teardown logic - make all inputs set to zero or empty
      billAmtInput.value = 0;
      tipAmtInput.value = 0;
      paymentId = 0;
      allPayments = {};

    });
  });
  
