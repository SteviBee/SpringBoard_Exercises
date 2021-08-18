describe("helper function testing with setup and tear down", function () {
    beforeEach(function () {
        allPayments = {billAmt: 100, tipAmt: 50, tipPercent: 0.50};
        submitPaymentInfo();
    });        
    it("Checking sumPaymentTotal for correct values returned if given inputs", function () {
        
        
        expect(sumPaymentTotal("billAmt")).toEqual(100);
        expect(sumPaymentTotal("tipAmt")).toEqual(50);
        expect(sumPaymentTotal("tipPercent")).toEqual(50);
    })

    afterEach(function () {
        allPayments = {};
    });   
})
