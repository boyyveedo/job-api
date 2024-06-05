const Job = require('../model/Job')

const createJob = async (req, res) => {
    try {
        req.body.createdBy = req.user.id
        const job = await Job.create(req.body)
        res.status(201).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Unable to create job" })
    }
}



const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({})
        res.status(200).json(jobs)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "job not found" })

    }
}

const getSingleJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            return res.status(404).json({ message: "job not found" })
        }
        res.status(200).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "failed to retreive job" })

    }
}

const deleteJobs = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id)
        if (!job) {
            return res.status(404).json({ message: "job not found" })
        }
        res.status(200).json({ message: "Job sucessfully deleted" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "failed to delete job", error: errror.message })
    }
}
const updateJobs = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the job' });
    }
};




module.exports = {
    createJob,
    getAllJobs,
    getSingleJob,
    deleteJobs,
    updateJobs
}