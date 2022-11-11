import {
  Container,
  Name,
  Icon
} from './styles';

type Props = { 
  name: string;
}

export function PlayerCard({name}: Props){
  return(
    <Container>
      <Icon name='person' />
      <Name>{name}</Name>
    </Container>
  )
}