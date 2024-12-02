import { Animated, Button, NativeModules, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Animatable from "react-native-animatable";

const Test = () => {
    const { LoginModule } = NativeModules;
    const [email, setEmail] = useState<string | null>(null);


    

    const handleLogin = async () => {
        try {
          const result = await LoginModule.showLogin();
          setEmail(result);
        } catch (error) {
          console.error("Login error: ");
        }
      };

    return (
        <View style={styles.container}>
            <Animatable.View animation="zoomIn" iterationCount={5} direction="alternate">
            <TouchableOpacity
                style={styles.button}
                onPress={() => { handleLogin() }}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            </Animatable.View>
           
            {email ? (
                <Text style={styles.emailText}>Email: {email}</Text>
            ) : (
                <Text style={styles.emailText}>No email available</Text>
            )}
        </View>
    )
}

export default Test;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    button: {
        height: 50,
        width: '80%',
        backgroundColor: '#FFC107',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#000000',
        textAlign: 'center',
        fontWeight: '500',
    },
    emailText: {
        marginTop: 20,
        color: '#000000',
    },
});
