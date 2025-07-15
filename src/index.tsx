import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout  from './components/layout';
import { SWRDevTools } from 'swr-devtools';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <SWRDevTools>
    <Layout />
  </SWRDevTools>
);

