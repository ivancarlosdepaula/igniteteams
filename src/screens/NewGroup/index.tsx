import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';

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

  async function handleNew(){
    try{
      if(group.length < 3){
        Alert.alert('Erro', 'O nome do grupo deve ter pelo menos 3 caracteres');
        throw new Error('O nome do grupo deve ter pelo menos 3 caracteres');
      }
      await groupCreate(group);
      navigation.navigate('players', {group});
    }catch(error){
      console.log(error);
    }
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