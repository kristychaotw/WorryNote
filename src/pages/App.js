import React, { useContext } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../components/styles/Global";
import { AppContainer } from "../components/styles/container.css";
import Nav from "../components/styles/Nav";
import { Routes, Route } from "react-router-dom";
import CreateNotePage from "./CreateNotePage/CreateNotePage";
import LoginPage from "./LoginPage/LoginPage";
import ListPage from "./ListPage/ListPage";
import PrivateRoute from "../PrivateRoute";
import ShowNotePage from "./ShowNotePage/ShowNotePage";
import Test from "./Test";
import { AuthProvider } from "../firebase";
import { AuthContext } from "../firebase";

const theme = {
  colors: {
    body: "#F2F2F2",
    nav: "#5085A5",
    primary: "#8BA6BC",
    secondary: "#656565",
    third: "#5085A5",
    dark: "#656565",
    white: "#FCFCFC",
  },
  fontSize: {
    s: "0.8rem",
    m: "1rem",
    l: "1.2rem",
    xl: "1.5rem",
    xxl: "1.8rem",
    xxxl: "2rem",
  },
  spacing: {
    xs: "5px",
    s: "10px",
    m: "20px",
    l: "40px",
  },
  device: {
    mobile: "600px",
    tablet: "998px",
    desktop: "1200px",
  },
  maxWidth: "1800px",
};

export default function App() {
  const currentUser = useContext(AuthContext);
  console.log("my:",currentUser);
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Nav display={currentUser == null && "none"} />
          <AppContainer
            padding={currentUser === null && "0"}
            maxWidth={currentUser === null && "1800px"}
          >
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/test" element={<Test />} />
              <Route path="*" element={<Test />} />
              <Route element={<PrivateRoute />}>
                <Route path="/list" element={<CreateNotePage />} />
                <Route path="/l" element={<ListPage />} />
                <Route path="/s" element={<ShowNotePage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Route>
            </Routes>
          </AppContainer>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}
