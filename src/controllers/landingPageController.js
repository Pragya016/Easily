import { JobModel } from "../models/jobsModel.js";

const jobModel = new JobModel();

export class LandingPageController {
    displayLandingPage(req, res) {
        res.render('landingPageView');
    }

    displayJobView(req, res) {
        res.render('jobsView', { jobs: jobModel.getJobs() });
    }

    displayJobDetails(req, res) {
        const id = req.params.id;
        const job = jobModel.getJobDetails(id);

        if (!job) {
            res.send('This job has expired!');
        }
        
        res.render('jobDetailsView', { job })
    }

    postNewJob(req, res) {
        res.render('postJobForm');
    }
}