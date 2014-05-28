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
    var random = new Random();
    random.seed(Date.now());

    // create the main context
    var mainContext = Engine.createContext();

    var bg = new Surface({
      size: [undefined, undefined],
      content: '<h1>Starfield</h1><h2>by <a href="http://morenoh149.github.io/">@morenoh149</a></h2>Made with <a href="http://famo.us">famo.us</a>. <a class="tweet" href="https://twitter.com/share?via=morenoh149&text=Check out this cool starfield @befamous" class="twitter-share-button" data-lang="en"><img src="img/twitter2.png" /></a><a href="https://github.com/morenoh149/starfield-famous"><img src="img/github.png" /></a>',
      properties: {
        backgroundColor: '#010',
        color: '#aaa'
      }
    });
    mainContext.add(bg);

    // https://en.wikipedia.org/wiki/Star_color#Harvard_spectral_classification
    function getStar() {
      var i = Math.random();
      if (i < 0.7645)
        return { color: '#FFBD6F', size: 1 };
      else if (i < 0.8855)
        return { color: '#FFDDB4', size: 2 };
      else if (i < 0.9615)
        return { color: '#FFF4E8', size: 2 };
      else if (i < 0.9915)
        return { color: '#FBF8FF', size: 3 };
      else if (i < 0.9975)
        return { color: '#CAD8FF', size: 4 };
      else
        return { color: '#AABFFF', size: 10 };
    }
    var MaxNumOfStars = 2000;
    var CurrentNumOfStars = 0;
    var starpool = [];

    // TODO change this logic to use a surface pool. So we reuse surfaces outside of the window
    // bounds and keep memory low
    var i; var numOfStarsToSpawn = 5;
    function respawnStars() {
      for (i=0; i<numOfStarsToSpawn; i++) {
        var star = getStar();
        var surface = new Surface({
          size: [star.size,star.size],
          properties: {
            backgroundColor: star.color,
            borderRadius: '15px'
          }
        });
        var xcen = random.gauss(0.5, 0.05);
        var ycen = random.gauss(0.5, 0.05);

        var stateModifier = new StateModifier({
          origin: [xcen, ycen]
        });

        var ysign; var xsign;
        xsign = xcen < 0.5 ? -1 : 1;
        ysign = ycen < 0.5 ? -1 : 1;
        var vector = {};
        vector.x = xcen-0.5;
        vector.y = ycen-0.5;
        var dest = getDest(vector, ysign, xsign);

        mainContext.add(stateModifier).add(surface);
        stateModifier.setTransform(
          Transform.translate(dest.x, dest.y, 0),
          {curve: Easing.inExpo, duration: 10000}
        );
        CurrentNumOfStars += 1;
      }
    }

    // returns dest with fields dest.x & dest.y which can be used in Transform.translate(dest.x,dest.y,0)
    function getDest(vector, ysign, xsign) {
      var viewportsize = mainContext.getSize();
      if (Math.min(viewportsize[0],viewportsize[1]) < 1) {
        viewportsize = [screen.width,screen.height];
      }
      var x = vector.x; var y = vector.y;
      while(Math.abs(x) < viewportsize[0] || Math.abs(y) < viewportsize[1]) {
        x *= (viewportsize[0]/2);
        y *= (viewportsize[1]/2);
      }
      return {
        x: x,
        y: y
      };
    }
    Timer.setInterval(respawnStars, 10);
});
