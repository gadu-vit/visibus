import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';

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
      <View style={[styles.mapContainer, styles.webWarning]}>
        <Text style={styles.warningText}>Mapa indisponível no modo Web</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.mapContainer}>
        <ActivityIndicator size="large" color="#339fff" />
        <Text style={{ marginTop: 8, color: '#333' }}>Carregando mapa...</Text>
      </View>
    );
  }

  // Importa os módulos somente quando não for web
  const MapView = require('react-native-maps').default;
  const Marker = require('react-native-maps').Marker;

  return (
    <View style={styles.mapWrapper}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location?.coords.latitude || -23.55052,
          longitude: location?.coords.longitude || -46.633308,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: location?.coords.latitude || -23.55052,
            longitude: location?.coords.longitude || -46.633308,
          }}
          title="Você está aqui"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    height: Dimensions.get('window').height * 0.35,
    backgroundColor: '#eee',
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webWarning: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  warningText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
