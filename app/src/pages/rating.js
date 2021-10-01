import React from 'react';
// import images - blue circle indicator
import SvgBluecircle from '../components/iconComponents/Bluecircle.js';
// import reddownarrow from './img/reddownarrow.svg';
import SvgReddownarrow from '../components/iconComponents/Reddownarrow.js';
// import greenuparrow from './img/greenuparrow.svg';
import SvgGreenuparrow from '../components/iconComponents/Greenuparrow.js';
// import indicatoricons.js
// import * as Indicators from '../components/iconComponents';


// helper function to select random value
function displayRandom() {
  // array to represent 3 different components
  let arr = [0, 1, 2];
  // roudn down to random number times array length
  var random = Math.floor(Math.random() * arr.length);

  return random
}

// exported function, Rating() which displays the overall rating
export default function Rating() {
  // set up random variable
  let random = displayRandom()
  // put Indicators, which is an object, into array so we can use map
  if (random === 0) {
    return (
        <div>
          <p>Today's $FCNTX Recommendation</p>
          <SvgBluecircle width="350" height="auto" />
          <h1>Hold</h1>
        </div>
    );
  } else if (random === 1) {
    return (
        <div>
          <p>Today's $FCNTX Recommendation</p>
          <SvgReddownarrow width="350" height="auto" />
          <h1>Sell</h1>
        </div>
    );
  } else if (random === 2){
    return (
        <div>
          <p>Today's $FCNTX Recommendation</p>
          <SvgGreenuparrow width="350" height="auto" />
          <h1>Buy</h1>
        </div>
    );
  }


}
