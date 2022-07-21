const { deleteScenario } = require("../Scenario/scenario.renderer")

module.exports = {
  getProjects: () => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("getProjects", {})
    if (Array.isArray(response))
      resolve(response);
    else
      reject("Something went wrong!")
  }),
  addProject: (newProject) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addProject", newProject)
    global.ipcRenderer.on("handle:addProject", (event, savedData) => {
      resolve(savedData)
    })
  }),
  updateProject: (name, description, _id) => new Promise((resolve, reject) => {
    const updatedProject = {
      name: name,
      description: description,
      _id: _id
    }
    global.ipcRenderer.send("updateProject", updatedProject)
    global.ipcRenderer.on("handle:updateProject", (event, savedData) => {
      resolve(savedData)
    })
  }),
  deleteProject: (projectId) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("deleteProject", projectId)
    if (response.deleteCount) {
      deleteScenario("projectId", projectId).then(() => {
        resolve(response.deleteCount)
      })
    }
    else if (response.error) {
      reject(response.error)
    }
  }),
  exportProject: (projectId) => new Promise((resolve, reject) => {
    const response = global.ipcRenderer.sendSync("exportProject", projectId);
    if (response.message === "success")
      resolve(response);
    else
      reject(response)
  })
}