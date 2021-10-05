import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

function JobAdvertisementAdd() {

    const initialValues = {

    }

    const validationSchema = yup.object().shape({

    })

    function handleJobAdvertisementValue(values){
        return{

        }
    }


    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{
                
            }}>

            </Formik>
        </div>
    )
}

export default JobAdvertisementAdd
