process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");

let item = { name: "Pickles", price: 5.24 };

beforeEach(function() {
  items.push(item);
});

afterEach(function() {
  items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */
describe("GET /items", function() {
  test("Gets a list of all items", async function() {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ items: [item] });
});
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */
describe("GET /items/:name", function() {
  test("Gets a single item", async function() {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({item});
  });

  test("Responds with 404 if can't find item", async function() {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /items - create item from data; return `{item: item}` */
describe("POST /items", function() {
  test("Add a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Tomato",
        price: 1.25
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      item: { name: "Tomato", price: 1.25 }
    });
  });
});
// end

/** PATCH /items/[name] - update item; return `{item: item}` */
describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Apple",
        price: 0.99
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: 
      {name: "Apple",
      price: 0.99}
    });
  });

  test("Responds with 404 if can't find items", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE  /items/[name] - delete item, return `{message: "item deleted"}` */
describe("DELETE /items/:name", function() {
  test("Deletes a single a item", async function() {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Item deleted" });
  });
});
//end
