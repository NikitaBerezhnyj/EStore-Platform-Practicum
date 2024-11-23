const { checkServerStatus } = require("../../src/controllers/serverStatusController");

describe("Server Status Controller - checkServerStatus", () => {
  it("should respond with the correct status and message", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ message: "The server is healthy! :)" });
  });
});
