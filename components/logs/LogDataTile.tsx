import React from 'react'
import { StyleSheet, View } from 'react-native'
import TableLog from '../../models/TableLog'
import { Text } from '../Themed'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TableStatus } from '../../constants/TableStatus';

type LogDataTileProps = {
  log: TableLog
}

const LogDataTile: React.FC<LogDataTileProps> = ({ log }) => {
  let style:any = {
    backgroundColor: 'lightgray',
    color: 'black'
  }
  if (log.status === TableStatus.Ready) {
    style.backgroundColor = "green"
    style.color = "white"
  }
  else if (log.status === TableStatus.Cleaning) {
    style.backgroundColor = "blue"
    style.color = "white"
  } else if (log.status === TableStatus.Dirty) {
    style.backgroundColor = "red"
    style.color = "white"
  }

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text>{log.date.toString()}</Text>
        <MaterialCommunityIcons name="calendar" size={24} color="white" />
      </View>
      <View style={styles.column}>
        <Text>{log.tableNumber}</Text>
        <MaterialCommunityIcons name="table-picnic" size={24} color="brown" />
      </View>
      <View style={styles.column}>
        <Text>{log.status}</Text>
        {
          log.status === TableStatus.Dirty ? <MaterialIcons name="dirty-lens" size={24} color="red" />
          : <MaterialCommunityIcons name={log.status === TableStatus.Cleaning ? "silverware-clean" : "silverware-fork-knife"} size={24} color={log.status === TableStatus.Cleaning ? "blue" : "green"} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 75,
    backgroundColor: 'lightgray',
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 12,
    flexDirection: 'row',
    elevation: 2
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default LogDataTile