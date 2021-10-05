import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Card, CardContent, CardHeader, Form, Icon } from 'semantic-ui-react';
import * as yup from 'yup'
import HrmsEmployeeService from '../../services/hrmsEmployeeService';
import FieldDateInput from '../../utilities/CustomFields/FieldDateInput';
import FieldTextInput from '../../utilities/CustomFields/FieldTextInput';

function EmployeeUpdate() {

    let { id } = useParams();
    let history = useHistory();
  
    const [employee, setEmployee] = useState();

    
    const initialValues={
        id:employee?.id || "",
        firstName:employee?.firstName || "",
        lastName:employee?.lastName || "",
        birthDate:employee?.birthDate || "",
        department:employee?.department ||"",
        email:employee?.email || "",
        password:employee?.password||"",
        passwordConfirm:employee?.passwordConfirm || "",
    }


    const validationSchema= yup.object().shape({
        firstName:yup.string().required("Bu alan gereklidir.").min(2).max(25),
        lastName:yup.string().required("Bu alan gereklidir.").min(2).max(25),
        birthDate:yup.date().required("Bu alan gereklidir."),
        department:yup.string().required("Bu alan gereklidir.").min(2),
        email:yup.string().email().required("Bu alan gereklidir."),
        password:yup.string(),
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null],"Girdiğiniz şifreler aynı olmalıdır.")

    })

    function handleEmployeeValue(values){
        return{
            id:id,
            firstName:values.firstName,
            lastName:values.lastName,
            birthDate:values.birthDate,
            department:values.department,
            email:values.email,
            password:values.password,
            passwordConfirm:values.passwordConfirm
        }
    }

    useEffect(()=>{
        let employeeService = new HrmsEmployeeService();
        employeeService.getHrmsEmployee(id)
        .then((result)=>setEmployee(result.data.data))
        .catch((errorResult)=>toast.error(errorResult))
    },[id])

    return (
        <div>
            <Formik initialValues={initialValues} 
            validationSchema={validationSchema} 
            enableReinitialize 
            onSubmit={(values)=>{
                    let employeeService = new HrmsEmployeeService();
                    employeeService.updateHrmsEmployee(id,handleEmployeeValue(values))
                    console.log(values)
                    .then((result)=>toast.success(result.data.data))
                    .catch((errorResult)=>toast.error(errorResult))
                    .finally(history.push("/employee"))
                }
            }>
                 <Form className="ui form" >
                    <Card fluid centered>
                        <CardHeader><h2>Personel Güncelleme Ekranı</h2></CardHeader>
                        <CardContent> 
                            <FieldTextInput name="firstName" label="Adınız" placeholder="Adınız"/>
                            <FieldTextInput name="lastName" label="Soyadınız" placeholder="Soyadınız"/>
                            <FieldDateInput name="birthDate" label="Doğum Tarihiniz" placeholder="Doğum Tarihiniz"/>
                            <FieldTextInput name="department" label="Departman" placeholder="Bulunduğunuz departmanın adı"/>
                            </CardContent>
                            <CardContent>
                            <FieldTextInput name="email" label="Mail Adresiniz" placeholder="Mail Adresiniz" />
                            <FieldTextInput type="password" name="password" label="Şifreniz" placeholder="Şifreniz"/>
                            <FieldTextInput type="password" name="passwordConfirm" label="Şifre Tekrarı" placeholder="Şifre Tekrarı"/>
                           </CardContent>
                           <CardContent extra><Button type="submit"><Icon name="add"></Icon> Güncelle </Button></CardContent>
                    </Card>
                </Form>

            </Formik>
            
        </div>
    )
}

export default EmployeeUpdate
