const express = require('express');
const { userLogin, userSignup } = require('../controller/Login');
const { addUserEntry, updateUserEntry, deleteUserEntry, searchUserEntry, getAllUserEntry, getSingleEDate } = require('../controller/Entry');
const { addDate, getAllDate, searchDate, deleteDate, editDate, getEntryByDateRange } = require('../controller/Date');

const entryRoute = express.Router()

entryRoute.post('/login', userLogin)
entryRoute.post('/signup', userSignup)

// add entry

entryRoute.post('/add-entry',addUserEntry)
entryRoute.put('/update-entry/:name',updateUserEntry)
entryRoute.delete('/delete-entry/:entry_id',deleteUserEntry)
entryRoute.post('/search-entry',searchUserEntry)
entryRoute.get('/all-entry',getAllUserEntry)
entryRoute.get('/entries-by-date',getSingleEDate)

// add date

entryRoute.post('/add-date',addDate)
entryRoute.get('/all-date',getAllDate)
entryRoute.get('/search-date',searchDate)
entryRoute.delete('/delete-date/:id',deleteDate)
entryRoute.get('/date-by-date-range',getEntryByDateRange)
entryRoute.put('/update-date/:id',editDate)

module.exports = entryRoute;