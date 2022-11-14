import AsyncStorage from "@react-native-async-storage/async-storage";

import { AppError } from "@utils/AppError";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroup: string){
  try{
    const storedGroups = await groupsGetAll();
    const groupAlreadyExist = storedGroups.includes(newGroup);
    
    if(groupAlreadyExist){
      throw new AppError('Este grupo já existe');
    }

    const storage = JSON.stringify([...storedGroups, newGroup]);
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  }catch(error){
    throw error;
  }
}