function deleteJob(id) {
    const res = confirm('Are you sure want to delete this job post?');
    if (res) {
        fetch('/job-details/' + id, {
            method : 'DELETE'
        }).then(res => {
            window.open('/jobs');
        })
    } else {

    }
}

// mongodb+srv://pragya016:<password>@cluster1.h2sjnzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1  