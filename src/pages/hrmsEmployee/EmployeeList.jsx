import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import HrmsEmployeeService from "../../services/hrmsEmployeeService";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  let history = useHistory();

  useEffect(() => {
    let employeeService = new HrmsEmployeeService();
    employeeService
      .getHrmsEmployees()
      .then((result) => setEmployees(result.data.data));
  }, []);

  const handleUpdateClick = (id) => {
    history.push("/employee/update/"+id);
  }

  const handleDeleteClick = (id) => {
    let employeeService = new HrmsEmployeeService();
    employeeService
      .deleteHrmsEmployee(id)
      .then((result) => setEmployees(result.data.data))
      .final(history.push("/employee"),window.location.reload(false));
    
  }

  return (
    <div>
      <Container>
        <Table celled fixed>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Adı</TableHeaderCell>
              <TableHeaderCell>Soyadı</TableHeaderCell>
              <TableHeaderCell>Doğum Tarihi</TableHeaderCell>
              <TableHeaderCell>Departman</TableHeaderCell>
              <TableHeaderCell>Mail Adresi </TableHeaderCell>
              <TableHeaderCell>Aktivasyon Durumu</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.birthDate}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.userStatus}</TableCell>
                <Table.Cell>
                  <Button
                    onClick={() => handleUpdateClick(employee.id)}
                    color="yellow"
                    size="medium"
                  >
                    <Icon name="edit">Güncelle</Icon>
                  </Button>
                  <Divider />
                  <Button
                    onClick={() => handleDeleteClick(employee.id)}
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
      </Container>
    </div>
  );
}

export default EmployeeList;
