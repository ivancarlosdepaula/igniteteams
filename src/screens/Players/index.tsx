import {useCallback, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { AppError } from '@utils/AppError';
import { groupsGetAll } from '@storage/group/groupsGetAll';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { 
  Container,
  Form,
  HeaderList,
  NumberOfPlayers
} from './styles';

type RouteParams = {
  group: string;
}


export function Players(){
  const [team, setTeam] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const route = useRoute();
  const {group} = route.params as RouteParams;
  const [groups, setGroups] = useState<string[]>([]);

  async function handleAddPlayer(){
    if(newPlayerName.trim().length < 3){
      return Alert.alert('Nova pessoa', 'O nome da pessoa deve ter pelo menos 3 caracters.');
    }
    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);
      const storedPlayers = await playersGetByGroup(group);
      setNewPlayerName('');
      console.log(players);
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message);
      }else{
        Alert.alert('Nova pessoa', 'Não foi possível adicionar a pessoa.');
        console.log(error);
      }
    }
  }

  async function fetchGroups(){
    try{
      const data = await groupsGetAll();
      setGroups(data)
    }catch(error){
      console.log(error)
    }
  }

  useFocusEffect(useCallback(()=>{
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group}
        subtitle='adicione a galera e separe os times'
      />
      <Form>
        <Input 
          placeholder='Nome da pessoa' 
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
        />
        <ButtonIcon 
          icon='add' 
          type='PRIMARY'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={groups}
          keyExtractor={item => item}
          renderItem={({item})=> (
            <Filter
              title={item}
              isActive={item === team}
              onPress={()=>setTeam(item)}
            />
          )}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>
      <FlatList 
        data={players}
        keyExtractor={item=>item}
        renderItem={({item})=>(
          <PlayerCard 
            name={item} 
            onRemove={()=>{}}
          />
        )}
        ListEmptyComponent={<ListEmpty message='Não há pessoas nesse time' />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
      />
      <Button title='Remover turma' type='SECONDARY' />
    </Container>
  );
}