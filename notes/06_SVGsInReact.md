### Working with SVGs in React

[This video](https://www.youtube.com/watch?v=JUrcWu57itY) goes through how to support SVGs in React natively, without using Styled Components.

#### Steps to Use SVG In React

0. Delete styled components items that are no longer needed - e.g. rating.styled.js as well as the import on rating.js

1. First, we use a directory called, "src/icons" rather than "src/img" because we can treat the SVG files as scalable icons rather than as an image such as a PNG.

2. We can import an icon into an app page, e.g. rating.js page with:

```
import bluecircle from '../icons/bluecircle.svg';
```

3. We can then import the image directly as a source within an image tag, with the dimensions built into the SVG file. Note the /> at the end of the tag:

```
return (
    <div>
      <img src={bluecircle} />
    </div>
);
```

4. We can overwrite these attributes with alternative styles manually in-line.

```
return (
    <div>
      <img width={400} height={"auto"} src={bluecircle} />
    </div>
);
```
However, we have to delete the global value within global.js for styled components:

```
img {
  border-radius: 5px;
  height: auto;
  width: 10rem;
}
```
5. If you want even more control over the SVG, you have to create an icon component.

Create an, "iconComponents" directory and then create a, "tsx" file, bluecircle.tsx.

Given that we are using tsx, we need to be able to have the capability to read this, so it is better to use extension .js.

Then, create a standard boilerplate react functional component to get things started. You can then copy and paste the SVG as the return value of the function component.

```
import * as React from "react";

function Indicator() {
  return (
    //
  );
}

export default Indicator;
```
CamelCase must be used for any properties such as StrokeWidth, and so these need to be modified.

6. The function of the SVG can be imported into the application page just like an HTML element.

```
import Indicator from '../iconComponents/BlueCircleSvg';
```
Note the extensions is not needed.  We can then import this component rather than an image.

```
export default function Rating() {

  return (
      <div>
        <Indicator />
      </div>
  );
```

7. Creating a component out of SVG gives us programmatic control over the rendering of a component if we enter in the appropriate inputs. We can control properties on the SVG tag similar to with an image tag.

Within the SVG function, in this case - Indicator:

```
function IndicatorCircle(props: React.SVGProps<SVGSVGElement>) {
...
// add:

<svg {...props} ...>

to the svg itself.
```
Then, the following would set the height to 350...

```
return (
    <div>
      <IndicatorCircle width={350} height={'auto'} />
    </div>
);
```
8. Creating components out of SVG can be automated, there is a library called SVGR which provides a command-line tool to allow this (to be done right in the app folder)

```
$ npx @svgr/cli (original svg file location) --out-dir (destination component file) --icon --javascript

$ npx @svgr/cli src/icons --out-dir src/iconComponents --icon

```

This automatically does the camelcasing and sets the width and height to be 1m.

An example result for the green arrow is:

```
import * as React from "react";

function SvgGreenuparrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30 30-13.432 30-30S48.568 2 32 2zm5.143 28.305V49H26.857V30.305H16L32 15l16 15.305H37.143z"
        fill="#43a047"
      />
    </svg>
  );
}

export default SvgGreenuparrow;
```

9. If desired you can also modify the color and other properties within the style tag right within div, so that everything within a given div will have the same styling.

## References

* [SVGs in React Natively - Youtube](https://www.youtube.com/watch?v=JUrcWu57itY)
* [tsx vs js and other extensions](https://stackoverflow.com/questions/64343698/what-is-the-difference-between-js-tsx-and-jsx-in-react)
