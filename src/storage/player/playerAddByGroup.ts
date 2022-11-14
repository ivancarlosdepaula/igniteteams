import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import {playersGetByGroup} from './playersGetByGroup'
import {PlayerStorageDTO} from './PlayerStorageDTO';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try{
    const storedPlayers = await playersGetByGroup(group);
    const playerAlreadyExist = storedPlayers.filter(player => player.name === newPlayer.name);
    if(playerAlreadyExist.length > 0){
      throw new AppError('Essa pessoa já está cadastrada nesse time.');
    }
    const storage = JSON.stringify([...storedPlayers, newPlayer]);
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  }catch(error){
    throw error;
  }
}