import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// import MyProjectListItem from "./MyProjectListItem";
import ProjectTable from "../ProjectsTable";
import { userContext } from "../../providers/UserProvider";
import { projectContext } from "../../providers/ProjectProvider";

// import background from "../../../public/lens-img-darkmode.jpeg";

const MyProjectsList = () => {
  const { loggedinUser, selectUser, findUserInfo } = useContext(userContext);
  const { project, myProjects, addProject, selectProject, fetchMyProjects } = useContext(projectContext);
  const params = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    selectUser(params.id);
    fetchMyProjects(params.id);
  }, [params]);

  // console.log("is this the right params", params);
  // console.log("do i have the user?", loggedinUser);
  // myProjects.map((row) => console.log("this is a row", row));

  const paperStyle = {
    boxSizing: "border-box",
    display: "flex",
    height: "80%",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    width: "80%",
    minWidth: "800px",
    backgroundColor: "#FAFAFA",
  };
  const boxStyle = {
    // backgroundImage: `url(${background})`,
    // backgroundRepeat: "no-repeat",
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    // backgroundAttachment: "fixed",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  };

  return (
    <>
      <Grid container style={boxStyle}>
        <Paper elevation={10} style={paperStyle}>
          <Box>
            <span
              style={{
                fontSize: "1.2rem",
                marginBottom: "24px",
                fontWeight: 900,
                display: "flex",
                alignContent: "center",
                alignSelf: "center",
                justifyItems: "center",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <img src={loggedinUser.avatar} alt="avatar" height="36px" style={{ marginRight: "8px" }} />
              <Typography
                sx={{
                  variant: "h2",
                  fontFamily: "monospace",
                  fontWeight: 'bold',
                  letterSpacing: ".3px"
                }}>
                {loggedinUser.username}&apos;s Projects
                {/* this need to be a cookie, not state */}
              </ Typography>
            </span>
          </Box>

          <ProjectTable whichProjects={myProjects} />
        </Paper>
      </Grid>
    </>
  );
};
export default MyProjectsList;
