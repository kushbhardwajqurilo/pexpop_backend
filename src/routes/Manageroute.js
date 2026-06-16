const express = require('express');
const { mangerEntry, updatemanagerEntry, deleteManagerEntry, searchManagerEntry, getAllManagerEntry, getSingleMangerDate } = require('../controller/managerEntry');
const { addManagerDate, getAllManagerDate, searchManagerDate, deleteManagerDate, getEntryByManagerDateRange, editManagerDate } = require('../controller/mangerDate');
const managerRoute = express.Router()



managerRoute.post('/add-entry', mangerEntry)
managerRoute.put('/update-entry/:name', updatemanagerEntry)
managerRoute.delete('/delete-entry/:entry_id', deleteManagerEntry)
managerRoute.post('/search-entry', searchManagerEntry)
managerRoute.get('/all-entry', getAllManagerEntry)
managerRoute.get('/entries-by-date', getSingleMangerDate)

// add date

managerRoute.post('/add-date', addManagerDate)
managerRoute.get('/all-date', getAllManagerDate)
managerRoute.get('/search-date', searchManagerDate)
managerRoute.delete('/delete-date/:id', deleteManagerDate)
managerRoute.get('/date-by-date-range', getEntryByManagerDateRange)
managerRoute.put('/update-date/:id', editManagerDate)

module.exports = managerRoute;
