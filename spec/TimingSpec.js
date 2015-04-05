describe("Timing", function() {

  it("should basically work", function() {
    var timer = HumanTimer.create({ log:true });
    timer.duration(5000).start();
  });
});
