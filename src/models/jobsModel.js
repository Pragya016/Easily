import { jobs, registeredUsers } from "./jobs.js";

export class JobModel {
    constructor (id, catagory, designation, location, company, salary, skillSet, numberOfopenings, jobOverView) {
        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear()
        const jobPostedDate = `${date}/${month}/${year}`
        this.id = id,
            this.jobCatagory = catagory;
        this.jobDesignation = designation;
        this.jobLocation = location;
        this.companyName = company;
        this.salary = salary;
        this.skillSet = skillSet;
        this.numberOfOpenings = numberOfopenings;
        this.jobPosted = jobPostedDate;
        this.jobOverView = jobOverView
        this.applicants = 0;
    }

    getJobs() {
        return jobs;
    }

    getJobDetails(id) {
        const job = jobs.find(job => job.id == id);
        return job;
    }

    isUserRegistered(email, password) {
        const user = registeredUsers.find(u => u.email == email && u.password == password);
        return user;
    }

    updateJob(jobToBeUpdated) {
        const index = jobs.findIndex(job => job.id == jobToBeUpdated.id);
        jobs[index] = jobToBeUpdated;
    }

    postJob(Details) {
        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        const id = Math.round(Math.random() * 1000000000);
        const jobPostedDate = `${date}/${month}/${year}`;

        const { jobCatagory, jobDesignation, jobLocation, companyName, salary, skillSet, numberOfOpenings, jobOverView } = Details;
        const newPost = {
            id,
            jobCatagory,
            jobDesignation,
            jobLocation,
            companyName,
            salary,
            skillSet,
            numberOfOpenings,
            jobPosted: jobPostedDate,
            jobOverView,
            applicants: '0'
        }

        jobs.push(newPost);
    }

}
