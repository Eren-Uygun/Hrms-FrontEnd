import axios from "axios";

export default class CityService{
    
    getCity(id){
        return axios.get("http://localhost:8080/api/cities/getCity?id="+id);
    }

    addCity(value){
        return axios.post("http://localhost:8080/api/cities/add",value);
    }

    updateCity(id,value){
        return axios.put("http://localhost:8080/api/cities/update/"+id,value);
    }
    
    deleteCity(id){
        return axios.delete("http://localhost:8080/api/cities/delete?id="+id);

    }

}