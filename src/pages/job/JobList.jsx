import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import JobService from "../../services/jobService";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  let history = useHistory();

  useEffect(() => {
    let jobService = new JobService();
    jobService.getJobs().then((result) => setJobs(result.data.data));
  }, []);

  const handleUpdateClick = (id) => {
    history.push("/job/update/"+ id);
  };

  const handleDeleteClick = (id) => {
    let jobService = new JobService();
    jobService.deleteJob(id).then((result) => setJobs(result.data.data));
    history.push("/job");
  };

  return (
    <div>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>İş Adı</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.jobName}</TableCell>
              <Table.Cell>
                <Button
                  onClick={() => handleUpdateClick(job.id)}
                  color="yellow"
                  size="medium"
                >
                  <Icon name="edit">Güncelle</Icon>
                </Button>
                <Divider />
                <Button
                  onClick={() => handleDeleteClick(job.id)}
                  color="red"
                  size="medium"
                >
                  <Icon name="delete">Sil</Icon>
                </Button>
              </Table.Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
