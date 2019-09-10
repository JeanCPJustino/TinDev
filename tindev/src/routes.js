/*
createSwitchNavigator    = Troca para a próxima tela, porém sem o recurso para acessar a tela anterior
createStackNavigator     = Cria uma pilha de telas, com o botão específico para acessar a tela anterior
createBottomTabNavigador = Cria uma navegação por abas na parte inferior da tela
createMaterialTopTabNavigator = Cria uma navegação por abas na parte superior da tela
createDrawerNavigator = Cria um menu lateral quando o usuário arrasta a tela para a esquerda
*/

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Main,
    })    
);