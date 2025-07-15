import React from 'react';
import './layout.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from '../../theme';
import AppBar from "../../components/AppBar";
import Container from "@mui/material/Container";
import Footer from "../../components/Footer";
import MainContent from "../../components/MainContent";
import Latest from "../../components/Latest";
import {SWRConfig, Cache} from "swr";

const BaseURL = '/api/'
// const BaseURL = 'https://my-json-server.typicode.com/akeinhell/demo/'

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}

const Index = () => (
  <SWRConfig value={{
    refreshInterval: 30000,
    revalidateOnFocus: true,
    provider: localStorageProvider as () => Cache<any>,
    fetcher: (url, config) => {
      const requestUrl = BaseURL + url.split('/').filter((x: string) => x).join('/')
      console.log({requestUrl});
      return fetch(requestUrl, config).then(async res => {
        let data = await res.json();
        console.log('response: ', requestUrl, data);
        return data;
      })
    }
  }}>
    <AppTheme>
      <CssBaseline enableColorScheme/>
      <AppBar/>
      <Container
        maxWidth="lg"
        component="main"
        sx={{display: 'flex', flexDirection: 'column', my: 16, gap: 4}}
        data-mui-color-scheme="dark"
      >
        <MainContent/>
        <Latest/>
      </Container>
      <Footer/>
    </AppTheme>
  </SWRConfig>
);

export default Index;
