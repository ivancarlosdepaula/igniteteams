import { Alert } from 'react-native';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

import {
  Container,
 } from './styles';

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight
        title='Turmas'
        subtitle='Joque com sua turma'
      />
      <GroupCard title='Galera do Ignite' onPress={()=>{Alert.alert('Opa', 'Funcionou o click')}} />
    </Container>
  );
}
