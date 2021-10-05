import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Button, Container, Divider, Icon, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from 'semantic-ui-react';
import EmployerService from '../../services/employerService';

export default function EmployerList() {

    const[employers,setEmployers]=useState([]);
    let history = useHistory();

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getEmployers().then((result)=>setEmployers(result.data.data))
    }, [])

    
  const handleUpdateClick = (id) => {
    history.push("/employer/update/"+id);

}

const handleDeleteClick = (id) => {
  let employerService = new EmployerService();
  employerService.deleteEmployer(id).then((result) => setEmployers(result.data.data));
  history.push("/employer",window.location.reload(false))
}





    return (
        <div>
            <Container>
                <Table celled fixed>
                <TableHeader>
            <TableRow>
              <TableHeaderCell>Şirket Adı</TableHeaderCell>
              <TableHeaderCell>WebSite</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Aktivasyon Durumu</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
              {employers.map((employer)=>(
          <TableRow key={employer.id}>
                <TableCell>{employer.companyName}</TableCell>
                <TableCell>{employer.website}</TableCell>
                <TableCell>{employer.email}</TableCell>
                <TableCell>{employer.userStatus}</TableCell>
                <Table.Cell>
                  <Button onClick={()=>handleUpdateClick(employer.id)} color="yellow" size="medium">
                    <Icon name="edit">Güncelle</Icon>
                  </Button>
                  <Divider/>
                  <Button onClick={()=>handleDeleteClick(employer.id)} color="red" size="medium">
                    <Icon name="delete">Sil</Icon>
                  </Button>
                </Table.Cell>
              </TableRow>
            ))}
            </TableBody>
                </Table>
            </Container>
            
        </div>
    )
}
