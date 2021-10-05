import { Field, Form, Formik} from 'formik';
import React from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Card, FormField, Label,Input,FormGroup, CardContent, CardHeader, CardGroup, Divider, Button, Icon } from 'semantic-ui-react';
import * as yup from 'yup';
import CandidateService from '../../services/candidateService';
import FieldDateInput from '../../utilities/CustomFields/FieldDateInput';
import FieldTextInput from '../../utilities/CustomFields/FieldTextInput';

export default function CandidateAdd() {

    let history = useHistory();

    const initialValues={
        firstName:"",
        lastName:"",
        birthDate:"",
        nationalIdentityNumber:"",
        email:"",
        password:"",
        passwordConfirm:""
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Bu alan zorunludur.").min(2).max(25),
        lastName: yup.string().required("Bu alan zorunludur.").min(2).max(25),
        birthDate: yup.date().required("Bu alan zorunludur."),
        nationalIdentityNumber: yup.string().required("Bu alan zorunludur.").min(11).max(11),
        email: yup.string().required("Bu alan zorunludur.").email("Geçerli bir mail adresi giriniz."),
        password: yup.string().required("Şifreniz en az 6 en fazla 20 karakterden oluşmalıdır."),
        passwordConfirm: yup.string().required("Girdiğiniz şifreler aynı olmalıdır.").oneOf([yup.ref('password'),null],"Girdiğiniz şifreler aynı olmalıdır.")
    })

    function handleCandidateValue(values){
        return {
            firstName:values.firstName,
            lastName:values.lastName,
            birthDate:values.birthDate,
            nationalIdentityNumber:values.nationalIdentityNumber,
            email:values.email,
            password:values.password,
            passwordConfirm:values.passwordConfirm
        }
    }

    

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values)=>{
                let candidateService = new CandidateService();
                console.log(values);
                candidateService.addCandidate(handleCandidateValue(values)).then(result=>toast.success(result.data.message)).catch(errorResult=>toast.error(errorResult))
                .finally(history.push("/candidate"),window.location.reload(false))
            }}>
                <Form className="ui form" >
                    <Card fluid centered>
                        <CardHeader><h2>Aday Kayıt Ekranı</h2></CardHeader>
                        <CardContent> 
                            <FieldTextInput name="firstName" label="Adınız" placeholder="Adınız"/>
                            <FieldTextInput name="lastName" label="Soyadınız" placeholder="Soyadınız"/>
                            <FieldDateInput name="birthDate" label="DoğumTarihiniz" placeholder="Doğum Tarihiniz"/>
                            <FieldTextInput name="nationalIdentityNumber" label="Tc Kimlik No" placeholder="Tc Kimlik No"/>
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
