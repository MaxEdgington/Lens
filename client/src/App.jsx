import React, { useState, useContext } from "react";
import { Link, Route, Routes } from 'react-router-dom';
import axios from "axios";
import { Box } from "@mui/material";

import Header from "./components/Header";
import ColumnList from "./components/Columns-and-Tasks/ColumnList";
import StartNewProject from "./components/StartProject/StartNewProject";
import Login from "./components/User/Login";
import MyProjectsList from "./components/User/MyProjectsList";
import ErrorPage from "./components/ErrorPage";
import AllProjectsList from "./components/AllProjectsList";

import UserProvider from "./providers/UserProvider";
import ColumnsProvider from "./providers/ColumnsProvider";
import ProjectProvider from "./providers/ProjectProvider";
import MessageProvider from "./providers/MessageProvider";

import background from '../public/lots-of-lenses.jpg';
// import { columnsContext } from "./providers/ColumnsProvider";
// import CustomThemeProvider from './providers/ThemeProvider';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(4);

  // const setView = (active) => {
  //   setActive(active);
  // };

  // const ActiveView = () => {
  //   switch (active) {
  //     case 1:
  //       return <ColumnList />;
  //     case 2:
  //       return <StartNewProject setView={setView} />;
  //     case 3:
  //       return <NewTasksForm />; //this is not being used afterall
  //     case 4:
  //       return <Login setView={setView} />;
  //     case 5:
  //       return <MyProjectsList setView={setView} />;
  //     default:
  //       return <Login />;
  //   }
  // };


  // useEffect(() => {
  //   const url = 'http://localhost:8080/cats';

  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(url);
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching the data', error);
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <UserProvider >
        <Header />

        <ProjectProvider>
          <MessageProvider>
            <ColumnsProvider>

              <Routes>
                <Route path="/" element={<AllProjectsList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/myProjects/:id" element={<MyProjectsList />} />
                {/* <Route path="/projectboard" element={<ColumnList />} /> */}
                <Route path='/projectboard/:id/*' element={<ColumnList />} />
                <Route path="/newProject" element={<StartNewProject />} />
                <Route path='/users/:id' />
                <Route path="*" element={<ErrorPage />} />

              </Routes>

            </ColumnsProvider>
          </MessageProvider>
        </ProjectProvider>
      </UserProvider>

    </>
  );
}

export default App;
