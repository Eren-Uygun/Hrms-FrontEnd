import { Form, Formik } from 'formik'
import React from 'react'
import { Button, Card, CardContent, CardHeader, Icon } from 'semantic-ui-react'
import FieldDateInput from '../../utilities/CustomFields/FieldDateInput'
import FieldTextInput from '../../utilities/CustomFields/FieldTextInput'
import * as yup from 'yup'
import HrmsEmployeeService from '../../services/hrmsEmployeeService'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router'

function EmployeeAdd() {

    let history = useHistory();


    const initialValues={
        firstName:"",
        lastName:"",
        birthDate:"",
        department:"",
        email:"",
        password:"",
        passwordConfirm:"",
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
            firstName:values.firstName,
            lastName:values.lastName,
            birthDate:values.birthDate,
            department:values.department,
            email:values.email,
            password:values.password,
            passwordConfirm:values.passwordConfirm
        }
    }

    return (
        <div>
            <Formik initialValues={initialValues}validationSchema={validationSchema} onSubmit={(values)=>{
                let employeeService = new HrmsEmployeeService();
                employeeService.addHrmsEmployee(handleEmployeeValue(values)).then((result)=>toast.success(result.data.data))
                .catch((errorResult)=>toast.error(errorResult))
                .finally(history.push("/employee"),window.location.reload(false))

            }}>
            <Form className="ui form" >
                    <Card fluid centered>
                        <CardHeader><h2>Personel Kayıt Ekranı</h2></CardHeader>
                        <CardContent> 
                            <FieldTextInput name="firstName" label="Adınız" placeholder="Adınız"/>
                            <FieldTextInput name="lastName" label="Soyadınız" placeholder="Soyadınız"/>
                            <FieldDateInput name="birthDate" label="DoğumTarihiniz" placeholder="Doğum Tarihiniz"/>
                            <FieldTextInput name="department" label="Departman" placeholder="Bulunduğunuz departmanın adı"/>
                            </CardContent>
                            <CardContent>
                            <FieldTextInput name="email" label="Mail Adresiniz" placeholder="Mail Adresiniz" />
                            <FieldTextInput type="password" name="password" label="Şifreniz" placeholder="Şifreniz"/>
                            <FieldTextInput type="password" name="passwordConfirm" label="Şifre Tekrarı" placeholder="Şifre Tekrarı"/>
                           </CardContent>
                           <CardContent extra><Button type="submit"><Icon name="add"></Icon> Kayıt Ol </Button></CardContent>
                    </Card>
                </Form>
            </Formik>
        
        </div>
    )
}

export default EmployeeAdd
