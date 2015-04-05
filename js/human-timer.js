/**
 * HumanTimer namespace
 */
var HumanTimer = {

  copyProperties: function(fromOpts, toOpts) {
    for (var key in fromOpts) {
      if (fromOpts.hasOwnProperty(key)) toOpts[key]=fromOpts[key];
    }
  },

  /**
   * Default options
   */
  defaults: {
    duration:0,
    log: false
  },

  /**
   * Create new timer instance
   */
  create: function(opts) {
    var config={};
    HumanTimer.copyProperties(HumanTimer.defaults, config);
    var timeoutId;
    var startTime;
    var ticks;
    var tick_dur=1000;

    var reset = function() {
      ticks=0;
    };

    var elapsed = function() {
      return ticks * tick_dur;
    };

    var onStart = function() {
      if (config.log) { console.log("Started", config.duration, startTime); }
    }

    var onStop = function() {
      if (config.log) { console.log("Stopped", new Date()); }
    };

    var tick = function() {
      if (config.log) { console.log("Tick", ticks, elapsed(), config.duration); }
      ticks++;
      if (elapsed() <= config.duration) {
        timeoutId = window.setTimeout(tick, tick_dur);
      } else {
        onStop();
      }
    };

    function timer() {};

    timer.options = function(values) {
      if (!arguments.length) return config;
      HumanTimer.copyProperties(values, config);
      for (var key in values) {
        if (values.hasOwnProperty(key)) config[key]=values[key];
      }
      return timer;
    };

    timer.options(opts);
    if (config.log) { console.log("HumanTimerJS instantiated!", config); }

    timer.duration = function(value) {
      if (!arguments.length) return config.duration;
      config.duration=value;
      return timer;
    };

    timer.start = function() {
      reset();
      if (!config.duration) {
        throw "No duration set.";
      }
      startTime = new Date();
      onStart();
      tick();
    };

    timer.stop = function() {
      onStop();
    };

    return timer;
  }

}
