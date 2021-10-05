import React from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { Container, Grid} from "semantic-ui-react";
import CandidateAdd from "../pages/candidate/CandidateAdd";
import CandidateDetail from "../pages/candidate/CandidateDetail";
import CandidateList from "../pages/candidate/CandidateList";
import CandidateUpdate from "../pages/candidate/CandidateUpdate";
import EmployerAdd from "../pages/employer/EmployerAdd";
import EmployerDetail from "../pages/employer/EmployerDetail";
import EmployerList from "../pages/employer/EmployerList";
import EmployerUpdate from "../pages/employer/EmployerUpdate";
import EmployeeAdd from "../pages/hrmsEmployee/EmployeeAdd";
import EmployeeList from "../pages/hrmsEmployee/EmployeeList";
import EmployeeUpdate from "../pages/hrmsEmployee/EmployeeUpdate";
import JobAdd from "../pages/job/JobAdd";
import JobList from "../pages/job/JobList";
import JobUpdate from "../pages/job/JobUpdate";
import Navi from "./Navi";
import Sidebar from "./Sidebar";
import './Styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div>
      <Navi/>
      <Container className="main">
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={3} floated={"left"}>
            <Sidebar className="sidebar"/>
          </Grid.Column>
          <Grid.Column width={13}>
            <Route exact path="/" component={null} />
            <Route exact path="/candidate" component={CandidateList} />
            <Route exact path="/candidate/:id" component={CandidateDetail} />
            <Route exact path="/candidate/add" component={CandidateAdd} />
            <Route exact path="/candidate/update/:id" component={CandidateUpdate} />
            
            <Route exact path="/employer" component={EmployerList} />
            <Route exact path="/employer/:id" component={EmployerDetail} />
            <Route exact path="/employer/add" component={EmployerAdd} />
            <Route exact path="/employer/update/:employerId" component={EmployerUpdate} />

            <Route exact path="/job" component={JobList} />
            <Route exact path="/job/add" component={JobAdd} />

            <Route exact path="/job/update/:id" component={JobUpdate}/> 


            <Route exact path="/employee" component={EmployeeList} />
            <Route exact path="/employee/add" component={EmployeeAdd} />
            <Route exact path="/employee/update/:id" component={EmployeeUpdate} />
            <Route exact path="/employee/:id" component={null} />


            
            <Route exact path="/jobAdvertisement/add" component={null} />
            <Route exact path="/jobAdvertisement/:id" component={null} />
          </Grid.Column>
        </Grid.Row>
        <ToastContainer position="bottom_right"/>
      </Grid>
    
      </Container>
    </div>
  );
}
