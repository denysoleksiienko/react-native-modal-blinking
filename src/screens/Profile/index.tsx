import React, { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomDropdownMenu } from '../../components/CustomDropdownMenu/CustomDropdownMenu.tsx';

export function ProfileScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'pink', justifyContent: 'center' }}>
      <CustomDropdownMenu
        renderMenu={() => (
          <View>
            <Text>Open</Text>
          </View>
        )}>
        <View>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
          <Text>ProfileScreen</Text>
        </View>
      </CustomDropdownMenu>
    </SafeAreaView>
  );
}
