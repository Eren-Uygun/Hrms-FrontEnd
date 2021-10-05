import axios from "axios";

export default class EmployerService{

    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getAll");
    }

    getEmployer(id){
        return axios.get("http://localhost:8080/api/employers/getById?employerId="+id);
    }

    addEmployer(value){
        return axios.post("http://localhost:8080/api/employers/add",value);
    }
    updateEmployer(id,value){
        return axios.put("http://localhost:8080/api/employers/update/"+id,value);
    }
    deleteEmployer(id){
        return axios.delete("http://localhost:8080/api/employers/delete/"+id);
    }

   
}