import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Platform } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import GlobalStyles from '../styles/GlobalStyles';

export default function MapSection() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const isWeb = Platform.OS === 'web';

  useEffect(() => {
    if (isWeb) return;

    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('Permissão de localização negada');
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      } catch (error) {
        console.error('Erro ao obter localização:', error);
        setErrorMsg('Erro ao obter localização');
      } finally {
        setLoading(false);
      }
    };

    requestLocation();
  }, []);

  if (isWeb) {
    return (
      <View style={[GlobalStyles.mapContainer, GlobalStyles.webWarning]}>
        <Text style={GlobalStyles.warningText}>🖥️ Mapa indisponível no modo Web</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={GlobalStyles.mapContainer}>
        <ActivityIndicator size="large" color="#339fff" />
        <Text style={{ marginTop: 8, color: '#333' }}>Carregando mapa...</Text>
      </View>
    );
  }

  if (!location || errorMsg) {
    return (
      <View style={GlobalStyles.mapContainer}>
        <Text style={GlobalStyles.warningText}>❌ {errorMsg || 'Localização não encontrada'}</Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.mapWrapper}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={GlobalStyles.map}
        showsUserLocation
        showsMyLocationButton
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
