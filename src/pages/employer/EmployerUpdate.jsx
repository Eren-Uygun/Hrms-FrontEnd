import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import EmployerService from '../../services/employerService';
import * as yup from 'yup';
import { Button, Card, CardContent, CardHeader, Icon } from 'semantic-ui-react';
import FieldTextInput from '../../utilities/CustomFields/FieldTextInput';
import FieldDateInput from '../../utilities/CustomFields/FieldDateInput';
import { toast } from 'react-toastify';

export default function EmployerUpdate() {
    let { employerId } = useParams();
    let history = useHistory();
  
    const [employer, setEmployer] = useState();

    const initialValues = {
        employerId:employer?.employerId || "",
        companyName:employer?.companyName || "",
        website:employer?.website ||"",
        email:employer?.email||"",
        password:employer?.password||"",
        passwordConfirm:employer?.passwordConfirm||""
    }

    const validationSchema = yup.object({
        companyName:yup.string().min(2).required("Bu alan zorunludur."),
        website:yup.string().required("Bu alan gereklidir"),
        email:yup.string().required("Bu alan gereklidir ve mail domaininiz web site domaini ile aynı olmalıdır.").email(),
        password:yup.string().required().min(6).max(20),
        passwordConfirm: yup.string().required("Girdiğiniz şifreler aynı olmalıdır.").oneOf([yup.ref('password'),null],"Girdiğiniz şifreler aynı olmalıdır.")

    })

    function handleEmployerValues(values){
        return{
        employerId:values.employerId,
        companyName:values.companyName,
        website:values.website,
        phoneNumber:values.phoneNumber,
        email:values.email,
        password:values.password,
        passwordConfirm:values.passwordConfirm
        }
    }

    useEffect(() => {
        let employerService = new EmployerService();
        employerService
        .getEmployer(employerId)
        .then((result)=>setEmployer(result.data.data));
    }, [employerId])


    return (
        <div>
            <Formik 
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize
             onSubmit={(values)=>{
                 console.log(values)
                let employerService = new EmployerService();
                employerService.updateEmployer(employerId,handleEmployerValues(values))
                .then((result)=>toast.success(result.data.data))
                .catch((errorResult)=>toast.error(errorResult))
                .finally(history.push("/employer"),window.location.reload(false))
            }}>
                <Form className="ui form" >
                    <Card fluid centered>
                        <CardHeader><h2>Aday Güncelleme Ekranı</h2></CardHeader>
                        <CardContent> 
                            <FieldTextInput name="companyName" label="Şirket Adınız" placeholder="Şirket Adınızı Giriniz."/>
                            <FieldTextInput name="phoneNumber" label="Şirketinize Ait Telefon Numarası" placeholder="Şirketinize Ait Telefon Numarası"/>
                            <FieldTextInput name="website" label="Websiteniz" placeholder="Websiteniz"/>
                            </CardContent>
                            <CardContent>
                            <FieldTextInput name="email" label="Şirketinize ait email adresiniz" placeholder="Şirketinize ait email adresiniz" />
                            <FieldTextInput type="password" name="password" label="Şifreniz" placeholder="Şifreniz"/>
                            <FieldTextInput type="password" name="passwordConfirm" label="Şifre Tekrarı" placeholder="Şifre Tekrarı"/>
                           </CardContent>
                           <CardContent extra>
                               <Button type="submit"><Icon name="add"></Icon> Güncelle </Button>
                               </CardContent>
                    </Card>
                </Form>
            </Formik>
        </div>
    );
}
