describe("Login", () => {
  it("should be able to login", () => {
    jest.mock("axios");
    const axios = require("axios");
    const result = axios.post("http://localhost:5000/api/v1/users/login", {
      username: "desafiosharenergy",
      password: "sh@r3n3rgy",
    });

    expect(result).not.toBeNull();
  });
});
