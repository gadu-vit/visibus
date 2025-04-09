import { NavigationIndependentTree } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from "../pages/HomePage";

const Stack = createNativeStackNavigator();
export default function PrivateRoutes() {
    
    return (
        <NavigationIndependentTree>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomePage} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationIndependentTree>
    )
}