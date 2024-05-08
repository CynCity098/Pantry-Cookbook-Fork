const { expect } = require("@jest/globals");


test("confirm truthy Jest is installed and working", () => {
    const f = false;

    expect(f).toBeFalsy();
})