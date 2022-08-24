import { Store } from "./Store";
import { expect } from "chai";
import "mocha";

describe("Store", () => {
  const store = new Store();

  it("Check simple data", () => {
    store.setState("data", { id: 400, name: "maty" });
    expect(store.getState().data.id).to.eq(400);
  });

  it("Check wrong data", () => {
    expect(store.getState().wrongData).to.eq(undefined);
  });

  it("Update data", () => {
    store.setState("data", { id: 400, name: "maty" });
    store.setState("data", { id: 123, name: "timmi" });
    expect(store.getState().data.name).to.eq("timmi");
  });
});
