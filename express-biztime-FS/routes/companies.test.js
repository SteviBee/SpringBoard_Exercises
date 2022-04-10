// connect to right DB --- set before loading db.js
process.env.NODE_ENV = "test";

// npm packages
const request = require("supertest");

// app imports
const app = require("../app");
const db = require("../db");

// Load DB with fake data
let testComp;
let testInvoice;

beforeEach( async function() {
    let result = await db.query(`
        INSERT INTO 
            companies (code, name, description)
            VALUES ('testCode', 'testCompany', 'Maker of test.')
            RETURNING code, name, description`);
    testComp = result.rows[0]

    // adding invoices:
    await db.query("SELECT setval('invoices_id_seq', 2, false)");
    let invoResults = await db.query(`
        INSERT INTO
            invoices (comp_code, amt)
            VALUES ('${testComp.code}', 12345)
            RETURNING id, comp_code, amt, paid, add_date, paid_date`) 
    testInvoice = invoResults.rows;
});

describe("get /companies", function () {
    test("gets a list of all companies", async function () {
        const resp = await request(app).get("/companies");
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            companies: [testComp]
        });
    })
})

describe("get /companies/testComp", function () {
    test("gets info from a company as well as the msgs", async function () {
        // Calling first query - company
        const respComp = await request(app).get(`/companies/${testComp.code}`);
        expect(respComp.statusCode).toEqual(200);
        testComp.testInvoice = testInvoice.map( inv => inv.id )

        expect(respComp.body).toEqual({
            "company": {
                code: "testCode",
                name: "testCompany",
                description: "Maker of test.",
                invoices: [2],
              }
            });
    })
    
    test("resp with 404 if incorrect ID provided", async function () {
        const resp = await request(app).get('/companies/0')
        expect(resp.statusCode).toEqual(404);
    })
})

describe("post /companies", function () {
    test("adds a company", async function () {
        const resp = await request(app).post("/companies")
        .send({
            code: "GE",
            name: "general electric",
            description: "electric supply company"
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            companies: {
                code: "GE",
                name: "general electric",
                description: "electric supply company"
            }
        });
    })
    // Forgot to send 500 test for conflict:
    test("It should return 500 for conflict", async function () {
        const response = await request(app)
            .post("/companies")
            .send({name: "Apple", description: "Huh?"});
    
        expect(response.status).toEqual(500);
      })

})

describe("Patch /companies/:code", function () {
    test("updates a company", async function () {
        const resp = await request(app).patch(`/companies/${testComp.code}`)
        .send({
            name: "updated!!",
            description: testComp.description
        });
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            companies: {
                code: testComp.code,
                name: "updated!!",
                description: testComp.description   
            }
        });
    })
    // Forgot to test ofr 404 and 500
    // test("It should return 404 for no-such-comp", async function () {
    //     const response = await request(app)
    //         .patch("/companies/blargh")
    //         .send({name: "Blargh"});
    
    //     expect(response.status).toEqual(404);
    //   });
    //   test("It should return 500 for missing data", async function () {
    //     const response = await request(app)
    //         .patch("/companies/apple")
    //         .send({});
    
    //     expect(response.status).toEqual(500);
    //   })
})

describe("delete /companies", function () {
    test("deletes a company", async function () {
        const resp = await request(app).delete(`/companies/${testComp.code}`);
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).toEqual({
            status: "deleted"
        });
    })
})


// TEAR DOWN ---------------------------------------------
afterEach(async function() {
    // delete any data created by test
    await db.query("DELETE FROM companies");
  });
  
  afterAll(async function() {
    // close db connection
    await db.end();
  });
  