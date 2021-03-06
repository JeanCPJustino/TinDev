import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';
import { hidden } from 'ansi-colors';

export default function Main ({ navigation }) {
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    async function hadleLike() {
        /* UTILILIZANDO A DESESTRUTURAÇÃO, A LINHA ABAIXO ARMAZENA O PRIMEIRO USUÁRIO
           DO ARRAY "users" NA VARIÁVEL "user", E O RESTANTE DOS REGISTROS DO ARRAY SÃO
           ALOCADOS NO NOVO ARRAY "rest" */
        const [ user, ...rest ] = users; 

        await api.post(`/devs/${user._id}/likes`, null, {
            headers: { user: id },
        })

        /* COM A DESESTRUTURAÇÃO DO ARRAY, NÃO PRECISO MAIS FAZER UM FILTRO PARA RETIRAR 
           O USUÁRIO EM QUESTÃO. APENAS RETORNO O ARRAY "rest" QUE JÁ NÃO CONTÉM O MESMO */
        //setUsers(users.filter(user => user._id !== id));

        setUsers(rest);
    }

    async function hadleDislike() {
        const [ user, ...rest ] = users; 

        await api.post(`/devs/${user._id}/dislikes`, null, {
            headers: { user: id },
        })

        //setUsers(users.filter(user => user._id !== id));

        setUsers(rest);
    }
    
    async function handleLogout(){
        await AsyncStorage.clear();

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                { users.length === 0
                    ? <Text style={styles.empty}>Acabou :( </Text>
                    : (
                        users.map((user, index) => (
                            <View key={user._id} style={[styles.card, { zIndex: users.length - index}]}>
                            <Image style={styles.avatar} source={{ uri: user.avatar }}></Image>
                                <View style={styles.footer}>
                                    <Text style={styles.name}>{user.name}</Text>
                                    <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                                </View>
                            </View>
                        ))
                    )
                }
            </View>
            
        { users.length > 0 && (
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={hadleDislike}>
                    <Image source={dislike}></Image>
                </TouchableOpacity>                   
                <TouchableOpacity style={styles.button} onPress={hadleLike}>
                    <Image source={like}></Image>
                </TouchableOpacity>
            </View>         
        ) }
        </SafeAreaView>        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: {
        marginTop: 30,    
    },
    empty: {
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardsContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: "center", 
        maxHeight: 500,        
    },
    card: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    avatar: {
        flex: 1,
        height: 300,
    },
    footer: {
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'      
    },
    bio: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
        lineHeight: 18,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 30,   
    },
    button: { 
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        //sombra no botão - android -- apenas esta linha
        elevation: 2, 
        //sombra no botão - ios -- todas as linhas abaixo
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    }
})