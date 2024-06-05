const express = require('express')
const router = express.Router()
const { create } = require('../controller/users')
const { getAllJobs, getSingleJob, createJob, deleteJobs, updateJobs } = require('../controller/jobs')
router.route('/').get(getAllJobs)
router.route('/create').post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJobs).delete(deleteJobs)





module.exports = router
