const { checkServerStatus } = require("../../../src/controllers/serverStatusController");
const mongoose = require("mongoose");

describe("Server Status Controller - checkServerStatus", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    jest.restoreAllMocks();
  });

  it("should respond with the correct status when database is connected", async () => {
    mongoose.connection.readyState = 1; // Connected

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Server health check successful",
      status: {
        server: "Running",
        database: "Connected"
      }
    });
  });

  it("should respond with the correct status when database is disconnected", async () => {
    mongoose.connection.readyState = 0; // Disconnected

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Server health check successful",
      status: {
        server: "Running",
        database: "Disconnected"
      }
    });
  });

  it("should respond with the correct status when database is connecting", async () => {
    mongoose.connection.readyState = 2; // Connecting

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Server health check successful",
      status: {
        server: "Running",
        database: "Connecting"
      }
    });
  });

  it("should respond with the correct status when database is disconnecting", async () => {
    mongoose.connection.readyState = 3; // Disconnecting

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      message: "Server health check successful",
      status: {
        server: "Running",
        database: "Disconnecting"
      }
    });
  });

  it("should handle errors and respond with status 500", async () => {
    Object.defineProperty(mongoose.connection, "readyState", {
      get: () => {
        throw new Error("Mocked connection error");
      },
      configurable: true
    });

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };

    await checkServerStatus(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal Server Error",
      status: {
        server: "Down",
        database: "Unknown"
      }
    });
  });
});
