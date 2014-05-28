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
    var height = screen.height;
    var random = new Random();
    random.seed(Date.now());

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
        var xcen = random.gauss(0.5, 0.2);
        var ycen = random.gauss(0.5, 0.2);

        var stateModifier = new StateModifier({
          origin: [xcen, ycen]
        });

        var ysign; var xsign;
        xsign = xcen < 0.5 ? -1 : 1;
        ysign = ycen < 0.5 ? -1 : 1;
        var path = {};
        path.x = xsign === -1 ? xcen : 1-xcen;
        path.y = ysign === -1 ? ycen : 1-ycen;
        var vector = {};
        vector.x = xcen-0.5;
        vector.y = ycen-0.5;
        var dest = getDest(vector, ysign, xsign);

        mainContext.add(stateModifier).add(surface);
        stateModifier.setTransform(
          Transform.translate(dest.x, dest.y, 0),
          {curve: Easing.inExpo, duration: 3000}
        );
      }
    }
    // returns dest with fields dest.x & dest.y which can be used in Transform.translate(dest.x,dest.y,0)
    function getDest(vector, ysign, xsign) {
      var x = vector.x; var y = vector.y;
      while(Math.abs(x) < width || Math.abs(y) < height) {
        x = x*(width/2);
        y = y*(height/2);
      }
      return {
        x: x,
        y: y
      };
    }
    Timer.setInterval(respawnStars, 10);
});
