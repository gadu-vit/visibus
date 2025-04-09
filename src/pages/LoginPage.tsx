import { Text, View, TextInput, TouchableOpacity, Image, StatusBar } from "react-native";
import { useState } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import { useAuth } from "../context/AuthContext";
import { CustomButtonText, CustomText } from "../components";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showError, setShowError] = useState(false);
  const [showRegisterInfo, setShowRegisterInfo] = useState(false);

  const isFormValid = login.trim() !== '' && senha.trim() !== '';

  function handleLogin() {
    if (isFormValid) {
      setShowError(false);
      signIn();
    } else {
      setShowError(true);
      // Oculta a mensagem após 3 segundos
      setTimeout(() => setShowError(false), 3000);
    }
  }

  function handleRegister() {
    setShowRegisterInfo(true);
    setTimeout(() => setShowRegisterInfo(false), 3000);
  }

  return (
    <>
      <StatusBar backgroundColor="#33a7dd" barStyle="light-content" />
      <View
        style={{
          backgroundColor: "#33a7dd",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require('../../assets/images/logo-grande.png')}
          style={GlobalStyles.logoGrande}
          resizeMode="contain"
          accessible
          accessibilityLabel="Logo do aplicativo VisiBus"
        />

        <Text style={{ color: "white", fontSize: 18, marginBottom: 15, fontWeight: 'bold' }}>
          Login Inicial
        </Text>

        <TextInput
          style={GlobalStyles.textInput}
          placeholder="Login"
          value={login}
          onChangeText={setLogin}
          accessibilityLabel="Campo de login"
        />

        <TextInput
          style={GlobalStyles.textInput}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          accessibilityLabel="Campo de senha"
        />

        {showError && (
          <CustomText style={{ color: '#fff', marginBottom: 8 }}>
            ⚠️ Preencha todos os campos para continuar.
          </CustomText>
        )}

        <TouchableOpacity
          onPress={handleLogin}
          style={GlobalStyles.btn}
          accessibilityLabel="Botão de acesso"
          accessibilityHint="Preencha login e senha para acessar"
        >
          <CustomButtonText>Acessar</CustomButtonText>
        </TouchableOpacity>

        {showRegisterInfo && (
        <CustomText style={{ color: '#fff', marginTop: 10 }}>
            ⚠️ Em construção!
        </CustomText>
        )}

        <TouchableOpacity
        onPress={handleRegister}
        activeOpacity={0.8}
        style={[
            GlobalStyles.btn,
            {
            backgroundColor: '#fff',
            borderWidth: 2,
            borderColor: '#ffcc00',
            marginTop: 10,
            },
        ]}
        accessibilityLabel="Botão criar conta"
        accessibilityHint="Toque para criar uma nova conta (em breve)"
        >
        <CustomButtonText style={{ color: '#ffcc00' }}>Criar conta</CustomButtonText>
        </TouchableOpacity>

      </View>
    </>
  );
}
