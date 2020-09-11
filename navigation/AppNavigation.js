import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import AllDialogScreen from "../screens/AllDialogScreen"
import DialogScreen from "../screens/AllDialogScreen"

const DialogNavigator=createStackNavigator({
Main:AllDialogScreen,
Chat:{
    screen:DialogScreen
}
},{
    initialRoutName:"Main"
})

export const AppNavigation=NavigationContainer(DialogNavigator)