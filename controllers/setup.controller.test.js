const connection = require("mysql");
const httpMocks = require("node-mocks-http");
const setUpController = require("./setup.controller");
describe("Test for creation and deletion of table", () => {
  it("Test for creation", async () => {
    const req = httpMocks.createRequest({
      body: {
        table: {
          id: ["int", "AUTO_INCREMENT"],
          name: ["varchar(50)", "not null", "unique"],
          price: ["int", "not null"],
          photo: ["varchar(50)"],
        },
        name: "books_test",
        primary_key: "id",
      },
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();
    await setUpController.createTable(req, res, next);
    const data = res._getData();
    console.log("logged data", data);
    expect(res.statusCode).toEqual(200);
  });
});
