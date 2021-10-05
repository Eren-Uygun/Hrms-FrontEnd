import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Card,
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
import CandidateService from "../../services/candidateService";

export default function CandidateList() {
  
  const [candidates, setCandidates] = useState([]);

  let history = useHistory();

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCandidates()
      .then((result) => setCandidates(result.data.data));
  }, []);

  const handleUpdateClick = (id) => {
      history.push("/candidate/update/"+id);

  }

  const handleDeleteClick = (id) => {
    let candidateService = new CandidateService();
    candidateService.deleteCandidate(id).then((result) => setCandidates(result.data.data));
    history.push("/candidate",window.location.reload(false))
  }

  return (
    <div>
        <Container>
        <Table celled fixed>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Tc Kimlik No</TableHeaderCell>
              <TableHeaderCell>Adı</TableHeaderCell>
              <TableHeaderCell>Soyadı</TableHeaderCell>
              <TableHeaderCell>Doğum Tarihi</TableHeaderCell>
              <TableHeaderCell>Mail Adresi </TableHeaderCell>
              <TableHeaderCell>Aktivasyon Durumu</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.nationalIdentityNumber}</TableCell>
                <TableCell>{candidate.firstName}</TableCell>
                <TableCell>{candidate.lastName}</TableCell>
                <TableCell>{candidate.birthDate}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.userStatus}</TableCell>
                <Table.Cell>
                  <Button onClick={()=>handleUpdateClick(candidate.id)} color="yellow" size="medium">
                    <Icon name="edit">Güncelle</Icon>
                  </Button>
                  <Divider/>
                  <Button onClick={()=>handleDeleteClick(candidate.id)} color="red" size="medium">
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
