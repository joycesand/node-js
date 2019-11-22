const mongoose = require("mongoose");
const Register = require("../models/registerModel");

describe("registration  model test", () => {
  // start up: runs before mytest ; in this case to create out testdb
  beforeAll(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/test-db", {
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      await Register.deleteMany({});
    } catch (err) {
      console.log("database error" + err);
    }
  });

  test("should be able to Save", async () => {
    try {
      const myRegister = new Register({ "first_name": "Sandra" });
      await myRegister.save();

      const items = await Register.find({});
      expect(items.length).toBe(1);
    } catch (err) {
      console.log("Database Error" + err);
    }
  });

  test("should not save when first name isnt input", async () => {
    try {
      await new Register({ "last_name": "Joreen" }).save();
    } catch (err) {
      console.log("database error " + err);
      expect(err.toString()).toBe(
        "ValidationError: first_name: Please Enter first name"
      );
    }
    const items = await Register.find({});
    expect(items.length).toBe(0);
  });

  //test tear down: some finishing work that needs to happen after the tests ran
  afterEach(async () => {
    try {
      await Register.deleteMany({});
    } catch (err) {
      console.log("database error " + err);
    }
  });
});
