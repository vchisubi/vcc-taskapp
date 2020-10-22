import axios from 'axios'

export default class Controllers {

  updateAndSort = async (ownerId) => {
    let resultArray = await axios.get('/api/todos/' + ownerId, {
      headers: {
        'Content_Type': 'application/json'
      }
    })
    resultArray = resultArray.data

    // console.log(resultArray)
    // console.log(typeof(resultArray))

    const sortedArray = resultArray.sort((a, b) => {
      return a._id - b._id
    })
    return sortedArray
  }

  postTodo = (inputTask, ownerId) => {
    const data = {
      title: inputTask,
      ownerid: ownerId,
      completed: false
    }
    axios.post('/api/todos', data)
      .then(console.log('Added task: ' + data.title))
  }

  obliterateTask = (id) => {
    axios.delete('api/todos/' + id).then((res) => {
      console.log('Deleting: ' + id)
    })
      .catch((err) => {
        console.log(err)
      }).then(this.updateAndSort())
  }

  obliterateAll = (ownerId) => {
    axios.delete('api/todos/clear/' + ownerId).then((res) => {
      console.log('Task list cleared: ' + res.data.deletedCount + ' tasks deleted.')
    })
      .catch((err) => {
        console.log(err)
      })
  }

  patchTask = (id, toggle) => {
    const data = {}
    data.id = id
    data.completed = toggle
    
    axios.patch('api/todos/' + id, data).then((res) => {
    })
      .catch((err) => {
        console.log(err)
      }).then(this.updateAndSort())
  }
}
