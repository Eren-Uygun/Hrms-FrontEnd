import React from 'react'
import { Grid } from "semantic-ui-react";
import EmployeeList from '../pages/EmployeeList';
import EmployerList from '../pages/EmployerList';
import Sidebar from '../layouts/Sidebar';
import JobSeekerList from '../pages/JobList';
import CandidateList from '../pages/CandidateList';
import JobsList from '../pages/JobList';
import { Route } from "react-router";

export default function Dashboard() {
    return (
        <div>
        <Grid >
        <Grid.Row>
          <Grid.Column width={4}>
          <Sidebar />
          </Grid.Column>
          <Grid.Column width={12}>
            <Route exact path="/" component={JobSeekerList} />
            <Route path="/employers" component={EmployerList} />
            <Route path="/candidates" component={CandidateList} />
            <Route path="/employees" component={EmployeeList} />
            <Route path="/jobs" component={JobsList} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
        </div>
    )
}
