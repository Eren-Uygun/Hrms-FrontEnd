import axios from "axios";

export default class JobService {
  getJob(id) {
    return axios.get("http://localhost:8080/api/jobs/getOne?id="+id);
  }

  getJobs() {
    return axios.get("http://localhost:8080/api/jobs/getAll");
  }

  addJob(value) {
    return axios.post("http://localhost:8080/api/jobs/add",value);
  }

  updateJob(id,value) {
    return axios.put("http://localhost:8080/api/jobs/update/"+id,value);
  }

  deleteJob(id) {
    return axios.delete("http://localhost:8080/api/jobs/delete?id="+id);
  }
}
