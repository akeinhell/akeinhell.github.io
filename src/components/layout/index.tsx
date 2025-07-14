import React from 'react';
import './App.css';
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

const Layout = () => (
  <>
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
  </>
);

export default Layout;
