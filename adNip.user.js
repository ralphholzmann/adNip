// ==UserScript==
// @name adNip
// @author Ralph Holzmann
// @version 1.1
// @description Replaces ads with pictures of kittens
// @include  http://*
// ==/UserScript==

// Thanks jed
// https://github.com/jed/alReady.js
var alReady = function( n, t, ready ) {
  ready = function(){ for ( t = 0; ready && t < n; ) ready[ t++ ](); ready = 0 }
  
  document.addEventListener && document.addEventListener( "DOMContentLoaded", ready, false )
  
  !function check() {
    ready && setTimeout( /^u|g$/.test( document.readyState ) ? check : ready, t *= 2 )
  }()

  return function( fn ){ ready ? ready[ n++ ] = fn : fn() }
}( 0, 1 ),
once = false,
kittify = function(){

(function( doc ) {
  
    // Ad dimensions via
    // http://en.wikipedia.org/wiki/Web_banner#Standard_sizes
    var dimensions = [
          [ 300, 100 ], 
          [ 728, 90  ],
          [ 468, 60  ],
          [ 234, 60  ],
          [ 120, 240 ],
          [ 300, 250 ],
          [ 720, 300 ],
          [ 120, 90  ],
          [ 240, 400 ],
          [ 120, 60  ],
          [ 88 , 31  ],
          [ 300, 600 ],
          [ 160, 600 ],
          [ 120, 600 ],
          [ 250, 250 ],
          [ 336, 280 ],
          [ 180, 150 ],
          [ 125, 125 ],
          [ 728, 90  ],
          [ 160, 600 ],
          [ 230, 90  ]
        ],
        // forEach Shim for FF compat
        forEach = function( array, fn ) {
          for (var i = 0; i < array.length; i++) {
            fn.call(array, array[i], i, array);
          }
        },
        // getStyle ala teh resig.
        getStyle = function( elem, name ) {
  
          var s;
          if ( elem[name] ) {
            return elem[name];
          } else if ( elem.style[name] ) {
            return elem.style[name];
          } else if ( window.getComputedStyle ) {
            name = name.replace(/([A-Z])/g, "-$1").toLowerCase();
            s = getComputedStyle( elem, '' );
            return s && s.getPropertyValue( name );
          }
  
        },
        elems = doc.querySelectorAll('a > img, iframe, object'),
        kittenUrl = 'http://placekitten.com/',
        n = 0,
        i, c, currentWidth, currentHeight;
        
        for ( i = 0, c = elems.length; i < c; i++ ) {
  
          currentWidth  = parseInt( getStyle( elems[i], 'width' ), 10);
          currentHeight = parseInt( getStyle( elems[i], 'height' ), 10);
  
          forEach( dimensions, function( dimension ) {
  
            var elem = elems[i],
                src, kittenImg, parentNode;
  
            // Do we have a match?
            if ( currentWidth == dimension[0] && currentHeight == dimension[1] ) {
              
              // The kitteh src
              src = kittenUrl + dimension.join('/');
              
              
              // if its an image, lets just replace the src
              if ( elem.tagName.toLowerCase() == 'img' ) {
                parentNode = elem.parentNode;
                if ( !~ parentNode.href.indexOf('://') || document.location.host != parentNode.href.split('://').pop().split('/')[0] ) {
                  elem.src = src;                

                // How many kittehs?
                n++;

                }
              } else {

                // How many kittehs?
                n++;
  
                // Create kitteh img
                kittenImg = document.createElement('img');
                kittenImg.src = src;
                kittenImg.width = dimension[0];
                kittenImg.height = dimension[1];
  
                // Replace ad with kitteh
                if ( elem.parentNode ) {
                  elem.parentNode.insertBefore( kittenImg, elem );
                  elem.parentNode.removeChild( elem );                
                }
              }
            }
          });
        
        }
        
        //window.console && console.log( n + ' kittehs');
        
        ! once && setTimeout(kittify, 10000);
        once = true;
  })( document );

}

// Replace ads asap
alReady(kittify);