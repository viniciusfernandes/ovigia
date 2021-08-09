import { BottomTabView, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigator } from "react-navigation";


export const Nagegador = Navigator 

export const vigiaNavigator = createBottomTabNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});