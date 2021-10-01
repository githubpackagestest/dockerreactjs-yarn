## Collecting Components

To design this app according to our specifications, we need three key shapes:

* [Shape Repo](https://commons.wikimedia.org/wiki/Emoji_One_colored_circles)
* [Blue Circle](https://commons.wikimedia.org/wiki/File:Eo_circle_blue_blank.svg)
* [Green Up Arrow](https://commons.wikimedia.org/wiki/File:Eo_circle_green_arrow-up.svg
)
* [Red Down Arrow](https://commons.wikimedia.org/wiki/File:Eo_circle_red_arrow-down.svg
)

To replace the standard logo at the center of the React page, we simply do the following on App.js.  Note the .svg object was "imported" as its own object.

```
import bluecircle from './bluecircle.svg';

...
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={bluecircle} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://www.patdel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patrick Delaney Homepage
        </a>
      </header>
    </div>
  );
}
```
We will make additional modifications at will, including removing some of the text notifications and links from the App.js file.

```
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://www.patdel.com"
  target="_blank"
  rel="noopener noreferrer"
>
  Patrick Delaney Homepage
</a>
```
To add the component itself, went to above component website, inspected element on SVG item and selected, "Copy Outer HTML" for the object itself, then copy/pasted this into its own file.


### Edit CSS For Custom Branding

There seem to be two locations where the CSS is held:

index.css holds the following:

```
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

```

* index.css appears to control the font and layout of everything which goes below the header, as well as, "code" sections.

Then, there's App.css, which holds several key design keys:

```
...

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

...
```

We can adjust and change the color schemes, fonts, etc. here.

### manifest.json

Per [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest):

> Web app manifests are part of a collection of web technologies called progressive web apps (PWAs), which are websites that can be installed to a device’s homescreen without an app store. Unlike regular web apps with simple homescreen links or bookmarks, PWAs can be downloaded in advance and can work offline, as well as use regular Web APIs.

Inspecting our web app manifest we see the following:

```
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```
Inspecting the manifest, we can see that there are different icon and size selections (png files) depending upon the size of platform used - as well as favicon.ico size selections.

If we look at our mobile view we can get an idea of how this manifests itself:

![](/img/mobileview.png)

### index.js

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```


### Creating a Custom Surrounding Interface with Prompts

Basically, we need a hamburger menu with the capability to navigate to another page which would include some form of, "selector" which allows us to select the buy, hold or sell signal on the recommendation page.

#### Adding Basic Styles

1. Create a Global style and put under [global.js](/src/global.js)
2. Create a [theme.js](/src/theme.js) file which holds our variables.
3. Add new functionality to [/src/app.js](/src/app.js), and put the old code in another file called app1.js for safekeeping.
4. Import themeprovider

Note - to get this to work we had to go to the terminal and input, "npm i styled-components"

Note that this did not actually install, "styled components," possibly because we may have been in the wrong directory, or because we were running React while attempting the command, or because we need to use Yarn. Backing out and following the tutorial a bit more:

1. We can attempt to end the app by canceling it and re-installing with npm.

It worked!  It turns out we don't have to use Yarn, we can just back out of the app and then use:

> npm i styled-components

then restart the application, and it works.

#### Creating Burger Menu and Components

1. Create a "Components" folder inside of /src.
2. Put a Buger and Menu folder in that folder as well as index.js.

> index.js will be used for one purpose: allow us to import components from one file, which is very handy, especially when you have a lot of them.

In index.js we put:

```
// index.js
export { default } from './Burger';
```
3. Create [Burger.styled.js](/app/src/components/Burger/Burger.styled.js).  In this file we put styling components relating to what the little menu itself will look like. It's a defined button with children of defined height and width, essentially.

> side note - The transform-origin property will be needed later to animate the menu it toggles between open and closed states.


4. Create burger.js for the layout in the Burger folder.

Within burger.js we have the following, to import the StyledBurger:

```
// Burger.js
import React from 'react';
import { StyledBurger } from './Burger.styled';

const Burger = () => {
  return (
    <StyledBurger>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export default Burger;
```

5. Finally, got to Burger.js and add:

```
// Burger.js
import React from 'react';
import { StyledBurger } from './Burger.styled';

const Burger = () => {
  return (
    <StyledBurger>
      <div />
      <div />
      <div />
    </StyledBurger>
  )
}

export default Burger;
```
After performing the above, we don't see a menu yet, but it appears we have to perform the same for, "Menu" - creating a /Menu/index.js, Menu.js and Menu.styled.js.

After completing this we get the following:

```
./src/components/Menu/index.js
Attempted import error: 'default' is not exported from './Menu'.
```

It appears that the wrong code, the Menu.styled.js code was copied into the Menu.js file, rather than the actual Menu.js application.

After clearing this hurdle we see the following outputs on the terminal/processor:

```
src/App.js
  Line 7:10:  'Burger' is defined but never used  no-unused-vars
  Line 7:18:  'Menu' is defined but never used    no-unused-vars
```

After much debugging, the key missing component was an installable package:

```
$ npm install react-focus-lock
```

[react-focus-lock](https://github.com/theKashey/react-focus-lock)

Which is evidently a package that brings certain items on a page up to Mozilla specification.

Other dependencies based upon what we have built include (from package.json):

```
"@testing-library/jest-dom": "^5.14.1",
"@testing-library/react": "^11.2.7",
"@testing-library/user-event": "^12.8.3",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-focus-lock": "^2.5.2",
"react-scripts": "4.0.3",
"styled-components": "^5.3.0",
"web-vitals": "^1.1.2"
```
When we build from our Docker image, these should all be installed.

After we have built this we see the following two available burger menu pages:

![burgermenumain.png](/img/burgermenumain.png)

![burgermenumenu](/img/burgermenumenu.png)

### Customizing the Burger Menu

#### Customizing the Menu Itself

The, "StyledMenu" is kept in [Menu.js](/app/src/components/Menu/Menu.js).  

Actual menu items may be changed in this file.

```
return (
  <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
    <a href="/" tabIndex={tabIndex}>
      <span aria-hidden="true">🏠</span>
      Home
    </a>
    <a href="/" tabIndex={tabIndex}>
      <span aria-hidden="true">💵</span>
      Rating
      </a>
  </StyledMenu>
)
```

Links to pages can be added after href, but routes must be added for them to work.

#### Adding Additional Routes

In React, there are multiple ways to create new pages:

* Single page application.
* Multiple page application.

This may become important in the future, as for example if an API endpoint is desired, then we may need an actual page endpoint, whereas if information just needs to be displayed, this may need to be a single page application.

##### Single Page App with React Router

0. We need to install react-router-dom within the /app folder (so that it gets added to package.json):

```
$ npm install react-router-dom
```

1. There are two types of React routers, BrowserRouter (makes URLs like example.com/about) and HashRouter (makes URLs like example.com/#/about). We are using BrowserRouter in this example and use it to wrap the App component.

Within /src/index.js import the following two new items, [render](https://reactjs.org/docs/react-dom.html#render):

```
// imports for routing single page application
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
```
Then within ReactDOM.render() we add BrowserRouter:

```
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. Create a /app/src/pages folder and add our new page, "rating":

```
import React from “react”;

export default function Rating() {

  return (
    <>
    <h1>Rating</h1>
    <p>Here is where the rating goes.</p>
    </>
  );

}
```

3. Create any other pages desired in src/pages.

4. Decide and incorporate the routers that you want to use using [Switch](https://reactrouter.com/web/api/Switch) and [Route](https://reactrouter.com/web/api/Route). Switch groups all routes together and ensures that they take the precedence from top-to-bottom. Route, on the other hand, defines individual routes.

The App.js file should use the decided routes.

Add the following imports new items to App.js:

```
import { Route, Switch } from 'react-router-dom'

```
Then add the following to the app page:

```
<Switch>

  <Route exact path=”/” component={HomePage} />

  <Route exact path='/rating' component={Rating} />

</Switch>
```
Note that merely having this within the app allows the menu we have built eariler to understand our routing. Unlike Ruby on Rails, which seems to be opinionated about where routes go in terms of project structure, the routes can just be placed as instructions within the app code itself.

Also note that on the rating page, our, "main application" language kept within App.js will stay on the page, until we create another specific route for this.  Therefore we can remove the extra, non-needed information:

```
<h1>Hello. Welcome to the $FCNTX Rating tool.</h1>
```

...and we can place it on its own page.


##### Creating Additional Pages with React Router

This was accomplished above.

#### Customizing the Home Page

This can be done by customizing the individual '/src/pages.home.js' file.

#### Customizing the Rating Page

Now, since the, "pages" and "img" folder are parallel to each other, we have to use ".." to denote the relative path rather than "."

```
import bluecircle from '../img/bluecircle.svg';
```
Then the following gets added to the return function:

```
<img src={bluecircle} className="App-recommend" alt="hold" />
```

#### Customizing the Style

##### Merge Global Styles with Previous Desired Styles

The new style sheet is global.js:

* [global.js](/src/global.js)

The old stylesheet was:

* [App.css](/notes/Previous/App.css)

Basically, we can take all of the styles we need from App.css and copy them into global.js.

Note that the file global.js must end with the italicized tick mark.

The way styles are created is with [Styled Components])(https://styled-components.com/docs/api).

##### Using Styled Components

[Using this tutorial](https://blog.logrocket.com/how-to-use-styled-components-with-react-native/)

This also deals with creating pressable buttons.

1. Import:

```
import { styled } from 'styled-components';
```
[styled](https://styled-components.com/docs/api#styled) is the default export.

2. There are multiple ways to create the actual component within global.js per this [stackoverflow answer](https://stackoverflow.com/questions/62241217/styling-reactcomponent-svg-with-styledcomponents).

When we try to create a component, we get the following error:

```
./src/global.js
Attempted import error: 'styled' is not exported from 'styled-components'.
```
What it turns out is, we have to add the style directly to the page - not to the global stylesheet. Styles can be added to a global, to individual pages or to components.

So within "/pages/rating.js"

```
// import styles
import styled from 'styled-components';

...
```
and on a new file... rating.styled.js:

```
import styled from 'styled-components';
// import svg and name as icon
import { ReactComponent as Icon } from "../img/bluecircle.svg";

// add additional styling elements, giving them variable names

```

Then, within the actual rating.js file we attempt to import the svg.

After working with styled components for a while and trying to understand how to use it to manipulate SVGs, it turns out that there is a simpler way to work with SVGs in React - that essentially react has native SVG support as well as a command line way of creating them as components.

This will be covered in: [06_SVGsInReact.md](/notes/06_SVGsInReact.md).


# References

* [Creating Multi Page Website React](https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/) - notes on where routes and sofourth are kept.
* [Creating a Hamburger Menu](https://css-tricks.com/hamburger-menu-with-a-side-of-react-hooks-and-styled-components/)
* [Hamburger Menu Github](https://github.com/maximakymenko/react-burger-menu-article-app/tree/master/src)
* [Creating Multiple Pages with React Router - Stackexchange](https://stackoverflow.com/questions/41956465/how-to-create-multiple-page-app-using-react)
* [How to handle additional Routes with React Router -Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router)
* [Creating a Single Page Application Using React](https://www.creative-tim.com/blog/react/create-single-page-application-using-react/)
* [How to Use Styled Components](https://blog.logrocket.com/how-to-use-styled-components-with-react-native/)
* [Styling React Components](https://stackoverflow.com/questions/62241217/styling-reactcomponent-svg-with-styledcomponents)
* [Responsive SVGs](https://blog.logrocket.com/make-any-svg-responsive-with-this-react-component/)

## Wrong, Misleading or Poorly Created Tutorials

* [Single Page App with React Router](https://www.split.io/blog/react-router-feature-flags/) -- used [This repo](https://github.com/talianassi921/react-router-app) to follow along and create the below. Note! This is not actually a single page application, but rather a routed page which the tutorial called a single page application.
