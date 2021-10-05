import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, CardContent, CardHeader, Icon } from "semantic-ui-react";
import * as yup from "yup";
import JobService from "../../services/jobService";
import FieldTextInput from "../../utilities/CustomFields/FieldTextInput";

export default function JobAdd() {

  let history = useHistory();

  const initialValues = {
    jobName: "",
  };

  const validationSchema = yup.object({
    jobName: yup.string().required("İş adı giriniz.").min(3),
  });

  function handleJobValue(values){
    return{
      jobName:values.jobName

    }
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          let jobService = new JobService();
          jobService.addJob(handleJobValue(values)).then(result=>toast.success(result.data.data)).catch(errorResult=>toast.error(errorResult))
          .finally(history.push("/job"),window.location.reload(false))
        }}
        >
          <Form className="ui form">
            <Card fluid centered>
              <CardHeader>
                <h2>İş Ekleme Sayfası</h2>
              </CardHeader>
              <CardContent>
                <FieldTextInput
                  name="jobName"
                  label="İş Adı"
                ></FieldTextInput>
              </CardContent>
              <CardContent extra>
                <Button type="submit">
                  Ekle<Icon name="add user"></Icon>
                </Button>
              </CardContent>
            </Card>
          </Form>
       </Formik>
    </div>
  )
}
