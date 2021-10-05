import axios from "axios";

export default class HrmsEmployeeService{

    getHrmsEmployee(id){
        return axios.get("http://localhost:8080/api/hrmsEmployees/getById?id="+id);
    }

    getHrmsEmployees(){
        return axios.get("http://localhost:8080/api/hrmsEmployees/getAll");
    }


    addHrmsEmployee(value){
        return axios.post("http://localhost:8080/api/hrmsEmployees/add",value);
    }

    deleteHrmsEmployee(id){
        return axios.delete("http://localhost:8080/api/hrmsEmployees/delete?id="+id)
    }
    updateHrmsEmployee(id,value){
        return axios.put("http://localhost:8080/api/hrmsEmployees/update/"+id,value);

    }

}