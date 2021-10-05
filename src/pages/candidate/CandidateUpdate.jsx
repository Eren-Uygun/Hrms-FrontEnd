import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, CardContent, CardHeader, Icon } from "semantic-ui-react";
import * as yup from "yup";
import CandidateService from "../../services/candidateService";
import FieldDateInput from "../../utilities/CustomFields/FieldDateInput";
import FieldTextInput from "../../utilities/CustomFields/FieldTextInput";

export default function CandidateUpdate() {
  let { id } = useParams();
  let history = useHistory();

  const [candidate, setCandidate] = useState();

  const initialValues = {
    id: candidate?.id || "",
    password: candidate?.password || "",
    passwordConfirm: candidate?.passwordConfirm || "",
    firstName: candidate?.firstName || "",
    lastName: candidate?.lastName || "",
    email: candidate?.email || "",
    birthDate: candidate?.birthDate || "",
    nationalIdentityNumber: candidate?.nationalIdentityNumber || "",
  };

  const validationSchema = yup.object({
    firstName: yup.string().required("Bu alan zorunludur.").min(2).max(25),
    lastName: yup.string().required("Bu alan zorunludur.").min(2).max(25),
    birthDate: yup.date().required("Bu alan zorunludur."),
    nationalIdentityNumber: yup
      .string()
      .required("Bu alan zorunludur.")
      .min(11)
      .max(11),
    email: yup
      .string()
      .required("Bu alan zorunludur.")
      .email("Geçerli bir mail adresi giriniz."),
    password: yup
      .string()
      .required("Şifreniz en az 6 en fazla 20 karakterden oluşmalıdır.").min(6).max(20),
      passwordConfirm: yup.string().required("Girdiğiniz şifreler aynı olmalıdır.")
      .min(6).max(20).oneOf([yup.ref('password'),null],"Girdiğiniz şifreler aynı olmalıdır.")
  });

  function handleCandidateValue(values) {
    return {
      id: id,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      birthDate: values.birthDate,
      nationalIdentityNumber: values.nationalIdentityNumber,
    };
  }

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidate(id)
      .then((result) => setCandidate(result.data.data));
  }, [id]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          let candidateService = new CandidateService();
          candidateService
            .updateCandidate(id,handleCandidateValue(values))
            .then((result) => toast.success(result.data.data))
            .catch((errorResult) => toast.error(errorResult))
            .finally(history.push("/candidate"),window.location.reload(false))
        }}
      >
        <Form className="ui form">
          <Card fluid>
            <CardHeader style={{ margin: "1em" }}>
              <h2>Aday Güncelleme Ekranı</h2>
            </CardHeader>
            <CardContent>
              <FieldTextInput
                name="firstName"
                label="Adınız"
                placeholder="Adınız"
              ></FieldTextInput>
              <FieldTextInput
                name="lastName"
                label="Soyadınız"
                placeholder="Soyadınız"
              ></FieldTextInput>
              <FieldDateInput
                name="birthDate"
                label="DoğumTarihiniz"
                placeholder="Doğum Tarihiniz"
              ></FieldDateInput>
              <FieldTextInput
                name="nationalIdentityNumber"
                label="Tc Kimlik No"
                placeholder="Tc Kimlik No"
              ></FieldTextInput>
            </CardContent>
            <CardContent>
              <FieldTextInput
                name="email"
                label="Mail Adresiniz"
                placeholder="Mail Adresiniz"
              ></FieldTextInput>
              <FieldTextInput
              type="password"
                name="password"
                label="Şifreniz"
                placeholder="Şifreniz"
              ></FieldTextInput>
              <FieldTextInput
              type="password"
                name="passwordConfirm"
                label="Şifre Tekrarı"
                placeholder="Şifre Tekrarı"
              ></FieldTextInput>
            </CardContent>
            <CardContent extra>
              <Button type="submit">
                Güncelle<Icon name="add user"></Icon>
              </Button>
            </CardContent>
          </Card>
        </Form>
      </Formik>
    </div>
  );
}
