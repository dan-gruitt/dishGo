import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const LocationContext = createContext(null);

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [radius, setRadius] = useState(1); 

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.error('Permission to access location was denied');
                    return;
                }
                const currentLocation = await Location.getCurrentPositionAsync({});
                setLocation(currentLocation);
            } catch (error) {
                console.error('Error getting current location:', error);
            }
        };

        getUserLocation();
    }, []);

    const setLocationContext = (newLocation) => {
        setLocation(newLocation);
    };

    return (
        <LocationContext.Provider value={{ location, setLocation: setLocationContext, radius, setRadius }}>
            {children}
        </LocationContext.Provider>
    );
};

