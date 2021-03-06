import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {renderToString} from 'react-dom/server';

import App from './app';
import pages from './pages';
import template from './templates/default'

export default ({path, webpackStats:{compilation:{assets}}}) => {
  const page = pages.find(x=>x.path == path)||{};
  const scripts = Object.keys(assets)
    .map(x => x.replace('dist/',''))
    .filter(x => x.endsWith('.js'))
    .filter(x => x != 'generator.js')

  const styles = Object.keys(assets)
    .map(x => x.replace('dist/',''))
    .filter(x => x.endsWith('.css'))


  return template({
    content: 
    renderToString(
      <StaticRouter location={path}  context={{}}>
        <App assets={assets}/>
      </StaticRouter>
    ),
    root: rootUrl,
    styles,
    scripts,
    meta: page.meta
  })
}
  

