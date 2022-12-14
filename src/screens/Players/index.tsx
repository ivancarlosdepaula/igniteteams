import { useState, useEffect, useRef} from 'react';
import {Alert, FlatList, TextInput} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

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
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState('');
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const {group} = route.params as RouteParams;
  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer(){
    if(newPlayerName.trim().length < 3){
      return Alert.alert('Nova pessoa', 'O nome da pessoa deve ter pelo menos 3 caracters.');
    }

    if(team.length < 3){
      return Alert.alert('Nova pessoa', 'Selecione um time abaixo.');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    }

    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message);
      }else{
        Alert.alert('Nova pessoa', 'N??o foi poss??vel adicionar a pessoa.');
        console.log(error);
      }
    }
  }

  async function fetchPlayersByTeam(){
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Listar players', 'N??o foi poss??vel listar os players.');
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(playerName: string){
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'N??o foi poss??vel remover essa pessoa.');
    }
  }

  async function removeGroup(){
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover grupo', 'N??o foi poss??vel remover esse grupo.');
    }
  }

  async function handleGroupRemove(){
    Alert.alert('Remover grupo', 'Deseja remover o grupo?', [
      {text: 'N??o', style: 'cancel'},
      {text: 'Sim', onPress: ()=> removeGroup()}
    ]);
  }

  useEffect(()=>{
    fetchPlayersByTeam();
  },[team]);

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
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon 
          icon='add' 
          type='PRIMARY'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
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
      {
        isLoading ? <Loading /> :
        <FlatList 
        data={players}
        keyExtractor={item=>item.name}
        renderItem={({item})=>(
          <PlayerCard 
            name={item.name} 
            onRemove={()=>handlePlayerRemove(item.name)}
          />
        )}
        ListEmptyComponent={<ListEmpty message='N??o h?? pessoas nesse time' />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {paddingBottom: 100},
          players.length === 0 && {flex: 1}
        ]}
      />
      }
      <Button 
        title='Remover turma' 
        type='SECONDARY' 
        onPress={handleGroupRemove}
      />
    </Container>
  );
}