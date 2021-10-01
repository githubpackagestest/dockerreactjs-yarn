import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { useOnClickOutside } from './hooks';
import { GlobalStyles } from './global';
import { theme } from './theme';
import { Burger, Menu } from './components';
import FocusLock from 'react-focus-lock';
// import for routing
import { Route } from 'react-router-dom'
import Rating from './pages/rating'
import Home from './pages/home'

function App() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
        <div>
          <Route exact path='/rating' component={Rating} />
          <Route exact path='/' component={Home} />
        </div>
        <div>
          <small><a>Created by Patrick Delaney</a></small>
        </div>

      </>
    </ThemeProvider>
  );
}

export default App;
