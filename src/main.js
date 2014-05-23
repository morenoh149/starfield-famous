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
    var bg = new Surface({
      size: [undefined, undefined],
      content: '<h1>Starfield</h1><h2>by <a href="http://morenoh149.github.io/">@morenoh149</a></h2>Made with <a href="http://famo.us">famo.us</a>. <a class="tweet" href="https://twitter.com/share?via=morenoh149&text=Check out this cool starfield @befamous" class="twitter-share-button" data-lang="en"><img src="img/twitter2.png" /></a><a href="https://github.com/morenoh149/starfield-famous"><img src="img/github.png" /></a>',
      properties: {
        backgroundColor: '#333',
        color: '#aaa'
      }
    });
    mainContext.add(bg);

    var i; var numOfStars = 3;
    function respawnStars() {
      for (i=0; i<numOfStars; i++) {
        var surface = new Surface({
          size: [3,3],
          properties: {
            backgroundColor: '#eee',
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
