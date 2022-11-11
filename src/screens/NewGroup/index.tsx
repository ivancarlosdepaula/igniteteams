import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import {
 Container,
 Content,
 Icon
} from './styles';

export function NewGroup(){
  return(
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="Crie a turma para adicionar as pessoas" />
        <Input 
          placeholder='Nome da turma'
        />
        <Button title="Criar" style={{marginTop: 20}} />
      </Content>
    </Container>
  );
}