describe("A spec using beforeEach and afterEach", function() {
  var foo = 0;

  beforeEach(function() {
    foo += 1;
  });

  beforeEach(function() {
    foo += 2;
  });

  afterEach(function() {
    foo = 0;
  });

  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(3);
  });

  it("can have more than one expectation", function() {
    expect(foo).toEqual(3);
    expect(true).toEqual(true);
  });
});
