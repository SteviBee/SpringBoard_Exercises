process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let testItem = { name: "Test-Item" };

beforeEach(function () {
    items.push(testItem)


})

afterEach(function () {
    items.length = 0;
})

// TESTING GET /items

describe("Testing get /items", function () {
    test("get list of items", async function () {
        const resp = await request(app).get("/items")

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [testItem]});

    })
})
// TESTING POST /items

describe("Testing get /items", function () {
    test("POST new name", async function () {
        const resp = await request(app).post("/items").send({
            name: "test-name-2"
        });
  

        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            items: [{ name: "Test-Item" }, { name: "test-name-2" }] 
        });

    })
})
// // TESTING get single /items

describe("Testing get one item /items", function () {
    test("get single items", async function () {
   

        // requesting '/items/Test-Item'
       const resp = await request(app).get(`/items/${testItem.name}`)

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: testItem});

    })
    test("Responds with 404 if can't find item", async function() {
        const resp = await request(app).get(`/items/0`);
        expect(resp.statusCode).toBe(404);
      });
    });    

// // TESTING PATCH /items

describe("Testing get PATCH / Updated /items", function () {
    test("updating an item", async function () {
        const resp = await request(app).patch(`/items/${testItem.name}`).send({
            name: "UPDATED"
        })

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: {name: "UPDATED"}
        });

    })
})
// // TESTING delete /items

describe("Testing delete on /items", function () {
    test("deleting an item", async function () {
        const resp = await request(app).delete(`/items/${testItem.name}`)

        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });

    })
})

