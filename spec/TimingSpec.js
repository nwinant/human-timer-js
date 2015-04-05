describe("Timing", function() {

  it("should basically work", function() {
    var timer = HumanTimer.create();
    timer.duration(5000).start();
  });
});
