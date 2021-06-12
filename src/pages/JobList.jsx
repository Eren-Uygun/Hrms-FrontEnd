import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon, Item, Label } from "semantic-ui-react";
import JobService from "../services/JobService";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let jobService = new JobService();
    jobService
      .getJobs()
      .then((result) => setJobs(result.data.data));
  });

  return (
    <div>
      {/* <Header size="large">İs İlanları</Header>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Açıklama</Table.HeaderCell>
            <Table.HeaderCell>Sirket Adı</Table.HeaderCell>
            <Table.HeaderCell>Sehir</Table.HeaderCell>
            <Table.HeaderCell>Alım Sayısı</Table.HeaderCell>
            <Table.HeaderCell>Son Basvuru Tarihi</Table.HeaderCell>
            <Table.HeaderCell>Maas Aralıgı</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {jobPostings.map((jobPosting) => (
            <Table.Row key={jobPosting.id}>
              <Table.Cell>{jobPosting.jobDescription}</Table.Cell>
              <Table.Cell>{jobPosting.employer.companyName}</Table.Cell>
              <Table.Cell>{jobPosting.city.name}</Table.Cell>
              <Table.Cell>{jobPosting.openPositionCount}</Table.Cell>
              <Table.Cell>{jobPosting.applicationDeadline}</Table.Cell>
              <Table.Cell>
                {jobPosting.minSalary} - {jobPosting.maxSalary}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table> */}
      <Item.Group divided>
        {jobs.map((job) => (
          <Item key={job.id}>
            <Item.Content>
              <Item.Header as={NavLink} to={`/jobPostings/${job.id}`}>
                {job.jobPosition.name}
              </Item.Header>
              <Item.Meta>
                <span className="cinema">
                  {job.employer.companyName}
                </span>
              </Item.Meta>
              <Item.Description>{job.jobDescription}</Item.Description>
              <Item.Extra>
                <Button
                  primary
                  floated="right"
                  as={NavLink}
                  to={`/jobPostings/${job.id}`}
                >
                  Detaylar
                  <Icon name="right chevron" />
                </Button>
                <Label>Açık pozisyon : {job.openPositionCount}</Label>
                <Label>{job.typeOfWorking?.name}</Label>
                <Label>{job.wayOfWorking?.name}</Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  );
}