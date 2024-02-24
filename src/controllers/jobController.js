import { JobModel } from "../models/jobsModel.js";

const jobModel = new JobModel();

export class JobsController {
    static displayJobView(req, res) {
        const jobs = jobModel.getJobs();
        res.render('jobsView', { jobs });
    }

    static displayJobDetails(req, res) {
        const id = req.params.id;
        const job = jobModel.getJobDetails(id);

        if (!job) {
            res.send('This job has expired!');
        }

        res.render('jobDetailsView', { job })
    }

    static postNewJob(req, res) {
        res.render('postJobForm');
    }

    static postJob(req, res) {
        jobModel.postJob(req.body);
        res.redirect('/jobs')
    }

    static displayUpdateJobForm(req, res) {
        const id = req.params.id;

        // get job details by id
        const job = jobModel.getJobDetails(id);

        res.render('updateJobForm', {job})
    }

    static updateJobDetails(req, res) {
        const data = req.body;

        // update job details
        jobModel.updateJob(data);
        // res.redirect('/job-details/' + req.body.id);
        res.redirect('/jobs')
    }

    static deleteJob(req, res) {
        jobModel.deleteJob(req.params.id);
        res.redirect('/jobs');
    }
}