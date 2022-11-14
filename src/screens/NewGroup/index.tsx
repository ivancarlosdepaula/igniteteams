import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AppError } from '@utils/AppError';

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
      if(group.trim().length < 3){
        return Alert.alert('Erro', 'O nome da turma deve ter pelo menos 3 caracteres');
      }
      await groupCreate(group);
      navigation.navigate('players', {group});
    }catch(error){
      if(error instanceof AppError){
        Alert.alert('Novo grupo', error.message);
      }else{
        Alert.alert('Novo grupo', 'Não foi possível criar o novo grupo');
        console.log(error);
      }
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