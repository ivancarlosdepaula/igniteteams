import { StyleSheet, Text, View } from 'react-native';

export function Groups() {
  return (
    <View style={styles.container}>
      <Text>Grupos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
