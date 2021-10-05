import axios from "axios";

export default class CandidateService{

    getCandidate(id){
        return axios.get("http://localhost:8080/api/candidates/getById?id="+id);
    }

    getCandidates(){
        return axios.get("http://localhost:8080/api/candidates/getAll");
    }

    addCandidate(value){
        return axios.post("http://localhost:8080/api/candidates/add",value);
    }

    updateCandidate(id,value){
        return axios.put("http://localhost:8080/api/candidates/update/"+id,value);
    }

    deleteCandidate(id){
        return axios.delete("http://localhost:8080/api/candidates/delete?id="+id)
    }



}
