import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default registerForNotifications = async () => {
  let previousToken = await AsyncStorage.getItem('pushToken');
  console.log(previousToken);
  if (previousToken) return;
  else {
    let { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
    
    if (status !== 'granted') return;

    let token = await Notifications.getExponentPushTokenAsync();

    await axios.post(PUSH_ENDPOINT, { token: { token } });
  
    AsyncStorage.setItem('pushToken', token);
  }
}