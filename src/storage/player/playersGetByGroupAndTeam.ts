import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import {PlayerStorageDTO} from './PlayerStorageDTO';

import {playersGetByGroup} from './playersGetByGroup';

export async function playersGetByGroupAndTeam(group: string, team: string){
  try {
    const storage = await playersGetByGroup(group);
    const players = storage.filter(player => player.team === team);
    return players;
  } catch (error) {
    throw error;
  }
}