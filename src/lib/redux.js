import { configureStore, createAction, createReducer } from '@reduxjs/toolkit'

export const archiveTask = createAction('task/archive', (id) => ({
  payload: { id },
}))
export const pinTask = createAction('task/pin', (id) => ({ payload: { id } }))

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
  { id: '1', title: 'Something', state: 'TASK_INBOX' },
  { id: '2', title: 'Something more', state: 'TASK_INBOX' },
  { id: '3', title: 'Something else', state: 'TASK_INBOX' },
  { id: '4', title: 'Something again', state: 'TASK_INBOX' },
]

const taskStateReducer = createReducer(defaultTasks, {
  [archiveTask]: (state, action) => {
    state.forEach((task) => {
      if (task.id === action.payload.id) {
        task.state = 'TASK_ARCHIVED'
      }
    })
  },
  [pinTask]: (state, action) => {
    state.forEach((task) => {
      if (task.id === action.payload.id) {
        task.state = 'TASK_PINNED'
      }
    })
  },
})

const store = configureStore({
  reducer: { tasks: taskStateReducer },
})

export default store
