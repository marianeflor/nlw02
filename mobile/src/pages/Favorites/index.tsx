import React, { useState } from 'react'
import { View,  ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage'

const Favorites = () => {

  const [favorites, setFavorites] = useState([])
  
  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favorite = JSON.parse(response)       
        setFavorites(favorite)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })
  
  return (
    <View style={styles.container}>
      <PageHeader title='Meus proffys favoritos'/>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return(
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorite
            />
          )
        })} 

      </ScrollView>

    </View>
  )
}

export default Favorites
