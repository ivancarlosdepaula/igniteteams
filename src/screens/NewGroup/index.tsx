import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
  const [group, setGroup] = useState('');
  const navigation = useNavigation();

  function handleNew(){
    navigation.navigate('players', {group});
  }
  return(
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight title="Nova turma" subtitle="Crie a turma para adicionar as pessoas" />
        <Input 
          placeholder='Nome da turma'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setGroup}
        />
        <Button title="Criar" style={{marginTop: 20}} onPress={handleNew} />
      </Content>
    </Container>
  );
}