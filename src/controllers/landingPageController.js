import { JobModel } from "../models/jobsModel.js";

const jobModel = new JobModel();

export class LandingPageController {
    displayLandingPage(req, res) {
        res.render('landingPageView');
    }

    displayJobView(req, res) {
        if (req.session.email && req.session.password || req.cookies.session_id) {
            res.render('jobsView', { jobs: jobModel.getJobs() });
        } else {
            res.redirect('/login');
        }
    }

    displayJobDetails(req, res) {
        const id = req.params.id;
        const job = jobModel.getJobDetails(id);

        if (!job) {
            res.send('This job has expired!');
        }

        res.render('jobDetailsView', {job})
    }

    updateJobDetails(req, res) {
        const id = req.params.id;
        const job = jobModel.getJobDetails(id);

        // render a form to update job details
        res.render('updateJobView', {job});
    }
}