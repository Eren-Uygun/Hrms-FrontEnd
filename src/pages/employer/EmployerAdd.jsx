import { Form, Formik } from 'formik';
import React from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Card, CardContent, CardHeader, Icon } from 'semantic-ui-react';
import * as yup from 'yup';
import EmployerService from '../../services/employerService';
import FieldTextInput from '../../utilities/CustomFields/FieldTextInput';

function EmployerAdd() {
    let history = useHistory();
    

    const initialValues = {
        companyName:"",
        website:"",
        phoneNumber:"",
        email:"",
        password:"",
        passwordConfirm:"",
    }


    const validationSchema = yup.object().shape({
        companyName:yup.string().required().min(2),
        website:yup.string().required("Web site domaininiz ve email adresi domaininiz aynı olmalıdır.").min(2),
        email:yup.string().required(),
        password:yup.string().required().min(6).max(20),
        passwordConfirm: yup.string().required("Girdiğiniz şifreler aynı olmalıdır.").oneOf([yup.ref('password'),null],"Girdiğiniz şifreler aynı olmalıdır.")


        

    })

    function handleEmployerValues(values){
        return{
        companyName:values.companyName,
        website:values.website,
        phoneNumber:values.phoneNumber,
        email:values.email,
        password:values.password,
        passwordConfirm:values.passwordConfirm
        }
    }
    return (
        <div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{
                let employerService = new EmployerService();
                employerService.addEmployer(handleEmployerValues(values)).then(result=>toast.success(result.data.message)).catch(errorResult=>toast.error(errorResult))
                .finally(history.push("/employer"),window.location.reload(false))
            }}>

<Form className="ui form" >
                    <Card fluid centered>
                        <CardHeader><h2>Aday Kayıt Ekranı</h2></CardHeader>
                        <CardContent> 
                            <FieldTextInput name="companyName" label="Şirket Adı" placeholder="Şirket Adı"/>
                            <FieldTextInput name="phoneNumber" label="Şirkete Ait Telefon Numarası" placeholder="Şirkete Ait Telefon Numarası"/>
                            <FieldTextInput name="website" label="Web Adresi" placeholder="Web Adresi"/>
                            </CardContent>
                            <CardContent>
                            <FieldTextInput name="email" label="Mail Adresiniz" placeholder="Mail Adresiniz" />
                            <FieldTextInput type="password" name="password" label="Şifreniz" placeholder="Şifreniz"/>
                            <FieldTextInput type="password" name="passwordConfirm" label="Şifre Tekrarı" placeholder="Şifre Tekrarı"/>
                           </CardContent>
                           <CardContent extra><Button type="submit"><Icon name="add"></Icon> Kayıt Ol </Button>
                           </CardContent>
                    </Card>
                </Form>

            </Formik>
        </div>
    )
}

export default EmployerAdd
