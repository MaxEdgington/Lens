import { createContext, useState } from "react";
import axios from "axios";

export const projectContext = createContext();

export default function ProjectProvider(props) {
  const [project, setProject] = useState({}); //inital?
  //project is an object with all the keys from db, same as res.data below

  const fetchProject = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/projects");
      // need a query?
      console.log("project form fetch", res.data);
      setProject(res.data);

    } catch (error) {
      console.error("Could not fetch projects", error);
    }
  };

  const addProject = async (formData) => {
    try {
      const res = await axios.post(`http://localhost:8080/api/projects/add`, formData);
      console.log("this is what projProvider gets:", res.data);
      setProject(res.data);

    } catch (error) {
      console.error("Could not add project", error);
    }
  };

  const projectData = { project, fetchProject, addProject };

  return (
    <projectContext.Provider value={projectData}>
      {props.children}
    </projectContext.Provider>
  );
}
