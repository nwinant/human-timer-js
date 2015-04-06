describe("Configuration", function() {

  it("should have sane defaults", function() {
    var timer = HumanTimer.create();
    expect(timer.duration()).toBe(0);
    expect(timer.options().log).toBe(false);
    expect(timer.options()).toEqual(HumanTimer.defaults);
  });

  it("should not override defaults if given empty options", function() {
    var timerNoOptions = HumanTimer.create();
    var timerEmptyOptions = HumanTimer.create({});
    expect(timerEmptyOptions.options()).toEqual(timerNoOptions.options());
  });

  it("should persist configuration options", function() {
    var options = {
      duration: 1000
    };
    var timer = HumanTimer.create(options);
    expect(timer.duration()).toEqual(options.duration);
    expect(timer.options().duration).toEqual(options.duration);
    expect(timer.options().log).toBe(false);
    expect(timer.options()).toEqual({
      "duration": 1000,
      "log": false
    });
  });

  describe("Configuration chaining", function() {
    it("should chain configuration setters", function() {
      var timer = HumanTimer.create();
      expect(timer.duration(50)).toBe(timer);
    });

    it("no-arg config functions should return values", function() {
      var timer = HumanTimer.create();
      expect(timer.duration()).toBe(0);
      timer.duration(50);
      expect(timer.duration()).toBe(50);
    });

    it("should chain configuration setters & getters", function() {
      var timer = HumanTimer.create();
      expect(timer.duration(50)).toBe(timer);
      timer.duration(50);
      expect(timer.duration()).toBe(50);
      expect(timer.duration(7000).duration()).toBe(7000);
      expect(timer.duration(500).duration()).toBe(500);
    });
  });

  it("should throw an exception if misconfigured", function() {
    expect(HumanTimer.create().start).toThrow("No duration set.");
  });

});
