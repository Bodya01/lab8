import { useEffect, useState } from "react";
import { TouchableOpacity, View,Text } from "react-native";
import { Magnetometer } from 'expo-sensors'

const Magnem = () => {
    const [data, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);

    const _slow = () => {
        Magnetometer.setUpdateInterval(5000);
    };

    const _fast = () => {
        Magnetometer.setUpdateInterval(100);
    };

    const _subscribe = () => {
        setSubscription(
            Magnetometer.addListener( magnetometrData => {
                setData(magnetometrData)
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

    const {x, y, z} = data;
    return(
        <View>
            <Text>
                Magnetometer
            </Text>
            <Text>
                x: {x} y: {y} z: {z}
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

export default Magnem;