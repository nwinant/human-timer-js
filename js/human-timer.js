/**
 * HumanTimer base class
 */
function HumanTimer(opts) {
    var config={
      duration:0,
      log: true
    };
    var log;
    
    var updateLog = function() {
      if (config.log) {
        log = function(msg) { console.log(arguments); } 
      } else {
        log = function(msg) {};
      }
    }
    
    function my() {
    };
    
    my.options = function(values) {
      if (!arguments.length) return config;
      for (var key in values) {
        if (values.hasOwnProperty(key)) config[key]=values[key];
      }
      updateLog();
      return my;
    };
    
    my.options(opts);
    log("HumanTimerJS instantiated!", config);
    
    my.duration = function(value) {
      if (!arguments.length) return config.duration;
      config.duration=value + config.duration;
      return my;
    };
    
    return my;
}
