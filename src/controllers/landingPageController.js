import { JobModel } from "../models/jobsModel.js";

const jobModel = new JobModel();

export class LandingPageController {
    displayLandingPage(req, res) {
        res.render('landingPageView');
    }
}