const express = require('express')
const user = require('./routes/user')
const app = express()
const port = 3000

app.use('./routes/user', user)//ברגע שהוא רואה בקישור /user 
                        // ואנחנו מקבלים את הפונקציה של המודול user
app.use('./routes/post',post)
app.use('./routes/todos',todos)
app.use('./routes/comments', comments)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
