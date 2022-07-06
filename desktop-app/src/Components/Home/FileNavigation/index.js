//stylesheets
import './style.css'
import './scenarioCard.css'
import './requestcard.css'

//components
import ScenarioCard from './SecnarioCard';

//images
import folderIcon from '../../../assets/images/addfolder.svg'
import editMenu from '../../../assets/images/editMenu.svg'

//hooks and functions
import { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../../store';
import { addScenario, getScenarios } from '../../../renderer-process/Scenario/scenario.renderer';
import EditModal from '../EditProjectModal';
import TempScenario from './TempScenario';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { deleteProject, getProjects } from '../../../renderer-process/Project/project.renderer';

const FilesNavigation = () => {
  const { currentDocument, dispatch, currentProject } = useContext(StateContext)
  const [scenarios, setScenarios] = useState([]);
  const [tempScenarios, setTempScenarios] = useState([]);//temporary created scenarios
  const [openEditModal, setEditModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [editModalPosition, setEditModalPosition] = useState({ top: 0, left: 0 })
  const addNewScenario = (e) => {
    e.stopPropagation();
    setTempScenarios([{}])
  }

  const setTempScenarioName = (value) => {
    setTempScenarios([{ name: value }])
  }

  const setcurrentdocument = (document) => {
    dispatch("PUSH_DOCUMENT", document)
  }

  const getAllScenarios = async () => {
    const scenariosResponse = await getScenarios(currentProject._id);
    setScenarios(scenariosResponse)
    dispatch("SET_SCENARIOS", scenariosResponse)
  }

  const openeditmodal = (e) => {
    setEditModal(!openEditModal)
    setEditModalPosition({ top: e.clientY, left: e.clientX })
  }

  const deleteproject = () => {
    console.log("deleting")
    setConfirmDelete(false)
    deleteProject(currentProject._id).then(async () => {
      const projectsResponse = await getProjects()
      dispatch("SET_PROJECTS", projectsResponse)
    })

  }

  //for closing modal if clicked outside modal box
  const handelEditModal = (e) => {
    e.stopPropagation()
    if (e.target.className !== "filenavigation-edit-project" && e.target.className !== "filenavigation-edit-project-icon") {
      setEditModal(false)
    }
  }

  const handelResize = () => {
    setEditModal(false)
  }

  //for removing the temporary created scenario card if clicked outside the box
  const handelTempScenario =async (e) => {
    if (e.target.className !== "filenavigation-add-scenario" && e.target.className !== "temp-scenario-input") {
      if (tempScenarios[0]?.name) {
        const response=await addScenario({ scenarioname: tempScenarios[0].name }, currentProject._id);
        dispatch("PUSH_DOCUMENT",response)
        getAllScenarios()
      }
      setTempScenarios([]);
    }
  }

  useEffect(() => {
    if (currentProject._id) {
      getAllScenarios()
    }
  }, [currentProject])

  useEffect(() => {
    window.addEventListener("click", handelTempScenario)
    return () => {
      window.removeEventListener('click', handelTempScenario);
    };
  }, [tempScenarios])

  useEffect(() => {
    window.addEventListener("click", handelEditModal)
    window.addEventListener("resize", handelResize)
    return () => {
      window.removeEventListener('click', handelEditModal);
    };
  }, [])

  return (
    <div id='sidebar-container' style={{ display: "flex", borderRight: "1px solid rgb(66, 66, 66)", flexDirection: "column", justifyContent: "space-between", height: "91.3vh", width: "25vw" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "10%", borderBottom: "1px solid rgb(66, 66, 66)" }}>
        <input id='search-files-input' placeholder="Search scenario"
          style={{
            padding: 5, justifyContent: "center",
            alignItems: "center", display: "flex",
            border: "1px solid rgb(66, 66, 66)", borderRadius: "5px", height: "30%", outline: "none", width: "80%"
          }} />
      </div>
      <div style={{ borderBottom: "1px solid #424242", display: "flex", justifyContent: "space-between", padding: "0vw 1vw" }}>
        <p style={{ margin: "1vh 0vw", textOverflow: "ellipsis", fontSize: "1.2vw", overflow: "hidden", userSelect: "none", whiteSpace: "nowrap", }}>{currentProject.projectName}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={addNewScenario} className='filenavigation-add-scenario' title='add scenario'>
            <img style={{ height: "2.5vh" }} src={folderIcon} />
          </button>
          <button onClick={openeditmodal} style={{ position: "relative" }} className='filenavigation-edit-project' title='edit project'>
            <img className='filenavigation-edit-project-icon' style={{ height: "2vh" }} src={editMenu} />
          </button>
        </div>
      </div>
      <div id='sidebar-scenarios-cards-container' style={{ padding: "0px 3px", height: "auto", overflowX: "hidden", overflowY: "auto", flex: 1 }}>
        {
          tempScenarios.map(tempScenario => <TempScenario key="tempscenariocard1" scenario={tempScenario} currentDocument={currentDocument} onChange={setTempScenarioName} />)
        }
        {
          scenarios.map(scenario => <ScenarioCard key={scenario._id} openMenu={openeditmodal} scenario={scenario} onSelect={setcurrentdocument} />)
        }
      </div>
      {
        openEditModal &&
        <EditModal isOpen={openEditModal} position={editModalPosition} onDelete={() => setConfirmDelete(true)} />
      }
      {
        confirmDelete &&
        <DeleteConfirmationModal onConfirm={deleteproject} onClose={() => setConfirmDelete(false)}
          projectName={currentProject.projectName} isOpen={confirmDelete} />
      }
    </div>
  );
}
export default FilesNavigation;