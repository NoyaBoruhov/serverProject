import express from 'express';
import { userRouter } from './Backend/routes/user.js';
//  const user = require('./Backend/routes/user')
//  import { postRouter } from './Backend/routes/post.js'
// import    { todosRouter } from './Backend/routes/todos.js'

// const todos = require('./Backend/routes/todos')
// const comments = require('./Backend/routes/comments')
const app = express()
const port = 3000

app.use('/api/user', userRouter)//ברגע שהוא רואה בקישור /user 
//                         // ואנחנו מקבלים את הפונקציה של המודול user
// app.use('api/post',post)
// app.use('api/todos',todos)
// app.use('api/comments', comments)

app.route('/').get((req, res) => {

  res.send('Hello World! its working')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
