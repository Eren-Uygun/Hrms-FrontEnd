import { Formik } from 'formik'
import React from 'react'
import CityService from '../../services/cityService'
import * as yup from 'yup';

export default function CityAdd() {


    const initialValues={
        cityName:"",
    }

    const validationSchema = yup.object().shape({
        cityName:yup.string().required("Şehir adı boş olamaz.").min(2)

    })
    
    function handleCityValues(values){
        return{
            cityName:values.cityName,
        }
    }

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{
                let cityService = CityService();
                cityService.addCity(handleCityValues(values)).then()
            }}>




            </Formik>
        </div>
    )
}
