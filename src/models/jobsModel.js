import { jobs, registeredUsers } from "./jobs.js";

export class JobModel {
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

}
