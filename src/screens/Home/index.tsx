import React, { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CustomDropdownMenu } from '../../components/CustomDropdownMenu/CustomDropdownMenu.tsx';

export function HomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgray' }}>
      <CustomDropdownMenu
        renderMenu={() => (
          <View>
            <Text>Open</Text>
          </View>
        )}>
        <View>
          <Text>Home</Text>
          <Text>Home</Text>
          <Text>Home</Text>
          <Text>Home</Text>
        </View>
      </CustomDropdownMenu>
      <Button
        title={'Go to profile'}
        onPress={() => navigation.navigate('Profile')}
      />
    </SafeAreaView>
  );
}
