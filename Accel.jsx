import { useEffect, useState } from "react";
import { TouchableOpacity, View,Text } from "react-native";
import { Accelerometer } from 'expo-sensors'

const Accel = () => {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Accelerometer.setUpdateInterval(5000);
    };

    const _fast = () => {
        Accelerometer.setUpdateInterval(100);
    };

    const _subscribe = () => {
        setSubscription(
            Accelerometer.addListener(accelerometerData => {
                setData(accelerometerData)
            })
        );
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };

    useEffect(() => {
            _subscribe();
            return () => _unsubscribe();
    },[]);

    return(
        <View>
            <Text>
                Accelerometr
            </Text>
            <Text>
                x: {data.x} y: {data.y} z: {data.z}
            </Text>
            <View>
                <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} >
                    <Text>
                        {subscription ? 'On' : 'Off'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_slow}>
                    <Text>Slow</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_fast}>
                    <Text>Fast</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Accel;