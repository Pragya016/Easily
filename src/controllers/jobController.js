import { JobModel } from "../models/jobsModel.js";

const jobModel = new JobModel();

export class PostJobController {
    static postJob(req, res) {
        res.send('job posted successfully!')
    }

    static displayUpdateJobForm(req, res) {
        const id = req.params.id;

        // get job details by id
        const job = jobModel.getJobDetails(id);

        res.render('updateJobForm', {job})
    }

    static updateJobDetails(req, res) {
        res.redirect('/jobs')
    }
}