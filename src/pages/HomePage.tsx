import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, StatusBar, Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import GlobalStyles from '../styles/GlobalStyles';
import MapSection from '../components/MapSection';

// Importando os componentes com fonte Hanken Grotesk
import { CustomText, CustomTitle, CustomButtonText } from '@/src/components';

export default function HomePage() {
  const { signOut } = useAuth();

  function handleLogout() {
    signOut();
  }

  return (
    <>
      <StatusBar backgroundColor="#33a7dd" barStyle="light-content" />

      <View style={GlobalStyles.container}>
        {/* Cabeçalho com logo */}
        <View
          style={GlobalStyles.header}
          accessible
          accessibilityRole="header"
          accessibilityLabel="Cabeçalho do aplicativo VisiBus"
        >
          <Image
            source={require('../../assets/images/logo-grande.png')}
            style={GlobalStyles.logoFull}
            resizeMode="contain"
            accessibilityLabel="Logotipo do VisiBus"
          />
        </View>

        {/* Campo de busca */}
        <TouchableOpacity
          style={GlobalStyles.searchBar}
          accessible
          accessibilityRole="search"
          accessibilityLabel="Para onde você quer ir?"
          accessibilityHint="Toque para escolher ou digitar o seu destino"
        >
          <CustomText style={GlobalStyles.searchText}>Para onde você quer ir?</CustomText>
        </TouchableOpacity>

        {/* Mapa somente em mobile */}
        {Platform.OS !== 'web' && <MapSection />}

        {/* Conteúdo com transportes próximos */}
        <ScrollView contentContainerStyle={GlobalStyles.content}>
          <CustomTitle
            accessibilityRole="header"
            accessibilityLabel="Transportes próximos"
            style={GlobalStyles.sectionTitle}
          >
            Transportes próximos
          </CustomTitle>

          {/* Lista de ônibus */}
          <TouchableOpacity
            style={GlobalStyles.busItem}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Ônibus Linha 077"
            accessibilityHint="Chega em 3 minutos. Toque para mais detalhes"
          >
            <CustomText style={GlobalStyles.busLine}>Linha 077</CustomText>
            <CustomText style={GlobalStyles.busTime}>Chega em 3 min</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.busItem}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Ônibus Linha 085"
            accessibilityHint="Chega em 8 minutos. Toque para mais detalhes"
          >
            <CustomText style={GlobalStyles.busLine}>Linha 085</CustomText>
            <CustomText style={GlobalStyles.busTime}>Chega em 8 min</CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.busItem}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Ônibus Linha 038"
            accessibilityHint="Chega em 15 minutos. Toque para mais detalhes"
          >
            <CustomText style={GlobalStyles.busLine}>Linha 038</CustomText>
            <CustomText style={GlobalStyles.busTime}>Chega em 15 min</CustomText>
          </TouchableOpacity>

          {/* Botão de sair */}
          <View style={GlobalStyles.containerBtn}>
            <TouchableOpacity
              style={GlobalStyles.btn}
              onPress={handleLogout}
              accessible
              accessibilityRole="button"
              accessibilityLabel="Botão Sair"
              accessibilityHint="Toque para sair do aplicativo e retornar para a tela de login"
            >
              <CustomButtonText>SAIR</CustomButtonText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
