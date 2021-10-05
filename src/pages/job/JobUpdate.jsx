import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { Button, Card, CardContent, CardHeader, Icon } from "semantic-ui-react";
import * as yup from "yup";
import JobService from "../../services/jobService";
import FieldTextInput from "../../utilities/CustomFields/FieldTextInput";

function JobUpdate() {
  let { id } = useParams();

  let history = useHistory();

  const [job, setJob] = useState();

  const initialValues = {
    id: job?.id || "",
    jobName: job?.jobName || "",
  };

  const validationSchema = yup.object().shape({
    jobName: yup.string().required("Bu alan zorunludur.").min(2),
  });

  function handleJobValue(values) {
    return {
      id:id,
      jobName: values.jobName,
    };
  }

  useEffect(() => {
    let jobService = new JobService();
    jobService.getJob(id).then((result) => setJob(result.data.data))
    .catch((errorResult)=>toast.error(errorResult))
  }, [id]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          console.log(values);
          let jobService = new JobService();
          jobService
            .updateJob(id, handleJobValue(values))
            .then((result) => toast.success(result.data.data))
            .catch((errorResult) => toast.error(errorResult))
            .finally(history.push("/job"),window.location.reload(false))
        }}
      >
        <Form className="ui form">
          <Card fluid>
            <CardHeader>
              <h2>İş güncelleme ekranı</h2>
            </CardHeader>
            <CardContent>
              <FieldTextInput
                name="jobName"
                label="İş Adı"
                placeholder="İş adını giriniz."
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

export default JobUpdate;
