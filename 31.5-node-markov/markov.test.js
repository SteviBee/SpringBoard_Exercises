const { MarkovMachine } = require("./markov");

describe("MarkovMachine", function () {
    test("get inital words", function () {
        let mm = new MarkovMachine("test is great")
        expect(mm.words).toContain("test")
        expect(mm).toBeInstanceOf(MarkovMachine)
        expect(mm.chains).toBeInstanceOf(Map)
        expect(mm.chains.get("test")).toContain("is")
        expect(typeof mm.makeText(numWords=50)).toBe("string")
        expect(mm.makeText(numWords=50)).toEqual(expect.any(String))
        
    })

    test('choice picks from array', function () {
        expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
        expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
      });
          
})