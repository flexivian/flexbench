module.exports={
  addRequest: (configs) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("addRequest", configs);
    global.ipcRenderer.on("handel:addRequest", (event, savedData) => {
      resolve(savedData)
    })
  }),
  getRequests:(scenarioId)=>new Promise((resolve,reject)=>{
    global.ipcRenderer.send("getRequests", scenarioId);
    global.ipcRenderer.on("handel:getRequests", (event, fetchedData) => {
      resolve(fetchedData)
    })
  }),
  deleteRequest: (key, value) => new Promise((resolve, reject) => {
    global.ipcRenderer.send("deleteRequest", { key: key, value: value })
    global.ipcRenderer.on("handel:deleteRequest", (event, deletedData) => {
      if (deletedData.message) {
        resolve(deletedData)
      }
      else {
        reject(deletedData.error)
      }
    })
  }),
  runRequest:(config)=>new Promise((resolve,reject)=>{
    console.log(config)
    global.ipcRenderer.send("runRequest",config);
    global.ipcRenderer.on("handel:runRequest", (event, response) => {
      resolve(response)
    })
  })
}

