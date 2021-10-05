import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Card, Icon } from 'semantic-ui-react'
import CandidateService from '../../services/candidateService';

export default function CandidateDetail() {

    let { id } = useParams();

    const [candidate, setCandidate] = useState({});

    useEffect(() => {
        let candidateService = new CandidateService();
        candidateService.getCandidate(id).then((result) => setCandidate(result.data.data));
      },[id]);
      
    return (
        <div>
            <Card fluid>
                <Card.Content>{candidate.firstName} {candidate.lastName}</Card.Content>
                <Card.Content> {candidate.email} </Card.Content>
                <Card.Content extra> {candidate.birthDate} </Card.Content>
                 <Card.Content>
                    <Icon name='user'>{candidate.nationalIdentityNumber} </Icon>
                </Card.Content>
            </Card>
            
        </div>
    )
}
