import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import GlobalStyles from '../styles/GlobalStyles';

export default function MapSection() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (isWeb) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de localização negada');
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setLoading(false);
    })();
  }, []);

  if (isWeb) {
    return (
      <View style={[GlobalStyles.mapContainer, GlobalStyles.webWarning]}>
        <Text style={GlobalStyles.warningText}>Mapa indisponível no modo Web</Text>
      </View>
    );
  }

  if (loading || !location) {
    return (
      <View style={GlobalStyles.mapContainer}>
        <ActivityIndicator size="large" color="#339fff" />
        <Text style={{ marginTop: 8, color: '#333' }}>Carregando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.mapWrapper}>
      <MapView
        style={GlobalStyles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="Você está aqui"
        />
      </MapView>
    </View>
  );
}
