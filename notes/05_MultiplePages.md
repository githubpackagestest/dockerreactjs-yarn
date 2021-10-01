## Creating Multiple Version of Same Page as Output

### Different Strategy Ideas

#### Using RandomCat API

Rather than starting out with our own image, we can start off by showing a random cat from an existing codebase, and adapt the code.

* [RandomCat](https://medium.com/@shridharkamat10/how-to-make-a-random-cat-image-generator-with-react-and-cat-api-c52a093d8b42)

#### Pick from an Array of Images Using Random Number

* [Random Array of Images](https://stackoverflow.com/questions/61531025/how-do-i-display-a-random-image-retrieved-from-an-array-in-react-native)

### Creating Three Different Page Layouts

We use the, "different array of images" strategy, creating a, "indicatorimages.js" file.

```
const indicatorImages = [
  require('img/bluecircle.svg'),
  require('img/reddownarrow.svg'),
  require('img/greenuparrow.svg'),
];

export default indicatorImages;
```
Looking for a quick way to run Javascript functions in a python-notebook type environment - found [this notebook](https://colab.research.google.com/gist/korakot/22abd6eccac229e9cb9a027b088b50d6/notebook.ipynb#scrollTo=mz_hl90xmPFW)

We tested out our random number generator function and it seems to work with the following:

```
var indicatorImages = [
  ('bluecircle'),
  ('reddownarrow'),
  ('greenuparrow'),
];

random = Math.floor(Math.random() * indicatorImages1.length)
console.log(random)
console.log(indicatorImages1[random])

```
The shapes/images could be imported accordingly.

```
import bluecircle from '../img/bluecircle.svg';
import ...~

var indicatorImages ...

export indicatorImages

```
Then we can create a function which imports the indicatorImages and spits out a random one within rating.js.

```
import indicatorImages from '../img/indicatorimages.js';

function Indicate() {
  var randomImage =
    indicatorImages[Math.floor(Math.random() * indicatorImages.length)];
  console.log(randomImage);

  return (
    <View>
      <Image source={randomImage} />
    </View>
  );

```
This can then be couched within the Style we created in the rating.js default function.

After some of the modifications made in [06_SVGsInReact.md](/notes/06_SVGsInReact.md), the function may be changed and added to rating.js:

Therefore, displaying images randomly doesn't work because now we're attempting to display actual objects, essentially svg component objects rather than a .png or .jpg.

First, we can generate a random value with the following function:

```
// helper function to select random value
function displayRandom() {
  // array to represent 3 different components
  let arr = [0, 1, 2];
  // roudn down to random number times array length
  let random = Math.floor(Math.random() * arr.length);

  return random
}
```
Attempting to put objects into an array directly no longer works. So basically the following was found on YouTube:

[React.js - How to Dynamically Load Components Based on Selection - YouTube](https://www.youtube.com/watch?v=Qqgm170PZwk)

So one thing we can do is import not just one component at a time but several:

```
// import indicatoricons.js
import * as Indicators from '../iconComponents';
```
If we log, "Indicators" to console and take a look at the output, we get:

```
Indicators:  
Object { Bluecircle: Getter, Greenuparrow: Getter, Reddownarrow: Getter, … }
​
Bluecircle:
​
Greenuparrow:
​
Reddownarrow:
​
__esModule: true
​
Symbol(Symbol.toStringTag): "Module"
​
<get Bluecircle()>: function js()​
<get Greenuparrow()>: function js()​
<get Reddownarrow()>: function js()​
<prototype>: Object { … }
```
Which basically shows that we are importing an object with a list of other objects with, "Getters," which evidently point to a function.

However, it seems that for some reason, we can't easily pass a component that may have been a function and access it as an object.  There may be an easier way to do this, but for now, it does not seem to render and we do not seem to be able to access the component.

Instead, we can try a different approach, which is to use an if statement within the overall function, which returns a given SVG based upon the input:

```
// exported function, Rating() which displays the overall rating
export default function Rating() {
  // set up random variable
  let random = displayRandom()
  // put Indicators, which is an object, into array so we can use map
  if (random==0) {
    return (
        <div>
          <SvgBluecircle width="350" height="auto" />
        </div>
    );
  } else if (random == 1) {
    return (
        <div>
          <SvgReddownarrow width="350" height="auto" />
        </div>
    );
  } else if (random == 2){
    return (
        <div>
          <SvgGreenuparrow width="350" height="auto" />
        </div>
    );
  }

```

The above displays a random recommendation SVG as well as whatever text gets defined in the div.

## References

* [Codepen Example](https://codepen.io/Ruegen/pen/oYpEbm)
* [Randomly Select Images from Array](https://stackoverflow.com/questions/59805808/randomly-select-images-from-a-an-array-in-react-native)
* [React.js - How to Dynamically Load Components Based on Selection - YouTube](https://www.youtube.com/watch?v=Qqgm170PZwk)
