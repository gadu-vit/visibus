import { StyleSheet, Dimensions } from "react-native";

const GlobalStyles = StyleSheet.create({
  // Containers e estrutura base
  container: {
    flex: 1,
    backgroundColor: '#33a7dd',
    padding: 10,
  },
  containerBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },

  // Cabeçalho e logo
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffcc00',
    fontFamily: 'HankenGrotesk_700Bold',
  },
  logoFull: {
    width: 160,
    height: 50,
    marginRight: 10,
    resizeMode: 'contain',
  },
  logoGrande: {
    width: 155,
    height: 55,
    marginTop: -100,
    marginBottom: 100,
    resizeMode: 'contain',
  },

  // Títulos e textos
  sectionTitle: {
    fontSize: 20,
    color: '#444',
    fontWeight: 'bold',
    fontFamily: 'HankenGrotesk_700Bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontFamily: 'HankenGrotesk_700Bold',
  },
  textBtn: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'HankenGrotesk_700Bold',
  },

  // Input e busca
  textInput: {
    fontFamily: 'HankenGrotesk_400Regular',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#004f77',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 18,
    color: '#333',
    width: '80%',
    marginBottom: 14,
  },
  searchBar: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchText: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'HankenGrotesk_400Regular',
  },

  // Botões
  btn: {
    backgroundColor: '#ffcc00',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  btnCriarConta: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ffcc00',
    marginTop: 10,
    },

  // Lista de transportes
  busList: {
    padding: 20,
  },
  busItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  busLine: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    fontFamily: 'HankenGrotesk_700Bold',
  },
  busTime: {
    backgroundColor: '#ffcc00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'HankenGrotesk_700Bold',
  },
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

export default GlobalStyles;
