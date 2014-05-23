/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Surface = require('famous/core/Surface');
    // var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Easing = require('famous/transitions/Easing');
    var Timer = require('famous/utilities/Timer');

    // create the main context
    var mainContext = Engine.createContext();
    var i; var numOfStars = 3;
    var width = screen.width;

    function centerBias(num) {
      if (num < 0.5)
        return num+(0.2*Math.random());
      else
        return num-(0.2*Math.random());
    }
    function randBinary() {
      return Math.random() < 0.5 ? 1 : -1;
    }

    function respawnStars() {
      for (i=0; i<numOfStars; i++) {
        var surface = new Surface({
          size: [5,5],
          properties: {
            backgroundColor: '#333',
            borderRadius: '15px'
          }
        });
        var xcen = centerBias(Math.random());
        var ycen = centerBias(Math.random());

        var ysign = 1;
        if (ycen < 0.5)
          ysign = -1;
        var xsign = 1;
        if (xcen < 0.5)
          xsign = -1;

        var stateModifier = new StateModifier({
          origin: [xcen, ycen]
        });
        mainContext.add(stateModifier).add(surface);
        stateModifier.setTransform(
          Transform.translate((width+(500*Math.random()))*xsign,
                              (width+(500*Math.random()))*ysign, 0),
          {curve: Easing.inExpo, duration: 3000}
        );
      }
    }
    Timer.setInterval(respawnStars, 10);
});
