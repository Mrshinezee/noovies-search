const express = require('express')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const port = process.env.PORT || 5000



app.listen(port, () => console.log(`listing on port ${port}`))