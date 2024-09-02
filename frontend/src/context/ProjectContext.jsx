import { createContext, useState } from "react";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
    const name = 'Assignment';
    const [user, setUser] = useState(null);

    const value = {
        name, user, setUser
    }
    return (
        <ProjectContext.Provider value={value}>
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectContextProvider;