const TodoList = require('../../models/list-model')

const getList = (ownerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let yourList = await TodoList.find({ 'ownerid': ownerId })
      resolve(yourList)
    } catch(e) {
        reject(e)
    }
  })
}

const getTask = (taskId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let task = await TodoList.find({ 'id': taskId })
      resolve(task)
    } catch(e) {
        reject(e)
    }
  })
}


const createTask = (task) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newTask = await TodoList(task).save()
      resolve(newTask)
    } catch (e) {
        reject(e)
    }
  })
}

const updateTask = (taskId, toggle) => {
  return new Promise(async (resolve, reject) => {
    try {
      let updatedTask = await TodoList.findOneAndUpdate({ 'id': taskId }, { 'completed': toggle })
      resolve(updatedTask)
    } catch(e) {
       reject(e)
    }
  })
}

const deleteAllTasks = (ownerId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let DoJ = await TodoList.deleteMany({ 'ownerid': ownerId })
      resolve(DoJ)
    } catch(e) {
       reject(e)
    }
  })
}

const deleteTask = (taskId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let deletedTask = await TodoList.findOneAndDelete({ 'id': taskId })
      resolve(deletedTask)
    } catch(e) {
       reject(e)
    }
  })
}

module.exports = {
  getList: getList,
  getTask: getTask,
  createTask: createTask,
  updateTask: updateTask,
  deleteAllTasks: deleteAllTasks,
  deleteTask: deleteTask,
}