import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TableLog from '../../models/TableLog'
import { Text } from '../Themed'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TableStatus } from '../../constants/TableStatus';
import { convertTimestampDateToReadable } from '../../constants/Time';
import { statusColors } from '../../constants/Colors';

type LogDataTileProps = {
  log: TableLog,
  onPress: (log:TableLog) => any
}

const LogDataTile: React.FC<LogDataTileProps> = ({ log, onPress }) => {
  const { ready, seated, dirty, cleaning } = statusColors
  return (
    <View style={styles.container}>
      <Pressable style={({ pressed }) => [styles.pressable, pressed && styles.pressed]} android_ripple={{ color: "#fff" }} onPress={() => onPress(log)}>
        <View style={styles.innerContainer}>
          <View style={styles.column}>
            {/* @ts-ignore -- this will always be a number that can be converted to a date */}
            <Text>{convertTimestampDateToReadable(new Date(log.date)).split(" ")[0]}</Text>
            <MaterialCommunityIcons name="calendar" size={24} color="purple" />
          </View>
          <View style={styles.column}>
            <Text>{log.tableNumber}</Text>
            <MaterialCommunityIcons name="table-picnic" size={24} color="brown" />
          </View>
          <View style={styles.column}>
            <Text>{log.status}</Text>
            {
              log.status === TableStatus.Dirty ? <MaterialIcons name="dirty-lens" size={24} color={dirty} />
                : <MaterialCommunityIcons 
                    name={log.status === TableStatus.Cleaning ? "silverware-clean" : log.status === TableStatus.Ready ? "silverware-fork-knife" : "table-chair"} 
                    size={24} 
                    color={log.status === TableStatus.Cleaning ? cleaning : log.status === TableStatus.Ready ? ready : seated} />
            }
          </View>
        </View>
      </Pressable>
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
    elevation: 2
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pressable: {
    flex: 1,
    padding: 12,
  },
  pressed: {
    opacity: .7
  }
})

export default LogDataTile