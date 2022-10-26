import React from 'react'
import { Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

type NFDropdownProps = {
    onPress: () => void
    icon:IconSource
    style:any
    [x:string]:any
}

const NFDropdown:React.FC<NFDropdownProps> = ({ onPress, icon, style, ...rest }) => {
    return (
        <Pressable onPress={onPress} style={style}>
            <TextInput showSoftInputOnFocus {...rest} editable={false} right={<TextInput.Icon forceTextInputFocus={false} onPress={onPress} icon={icon} />} />
        </Pressable>
    )
}

export default NFDropdown