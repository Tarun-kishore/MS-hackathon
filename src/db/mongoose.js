// * This file establishes a connection of server from database on database server
// * Sequlize library is being used to manage database connection and queries

// ! all database information are saved in environment
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/toybankDB" || process.env.DATABASE_URL)