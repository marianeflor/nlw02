import React, { useState } from 'react'
import { View, Text, ScrollView, TextInput, Picker } from 'react-native'
// import {Picker} from '@react-native-community/picker';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'

import api from '../../services/api'

import styles from './styles'

const TeacherList = () => {

  const [isFiltersVisible, setIsFiltersVisible] = useState(false)

  const handleToggleFiltersVisible = () => {
    setIsFiltersVisible(!isFiltersVisible)
  }

  const [favorites, setFavorites] = useState<number[]>([])
  const [teachers, setTeachers] = useState([])
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const loadFavorites = () => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favorite = JSON.parse(response)
        const favoriteIds = favorite.map((teacher: Teacher) => teacher.id)

        setFavorites(favoriteIds)
      }
    })
  }

  // useFocusEffect(() => {
  //   loadFavorites()
  // })

  const handleFiltersSubmit = async () => {
    loadFavorites()

    const response = await api.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    })

    setIsFiltersVisible(false)
    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <PageHeader 
        title='Proffys disponíveis' 
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name='filter' size={20} color='#FFF' />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            {/* <TextInput
              value={subject}
              onChangeText={text => setSubject(text)}
              style={styles.input}
              placeholder='Qual a matéria?'
              placeholderTextColor='#c1bccc'
            /> */}
            <View style={styles.input}>
              <Picker
                selectedValue={subject}
                style={{ height: 50, width: 250 }}
                onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
              >
                <Picker.Item value='Artes' label='Artes' />
                <Picker.Item value='Biologia' label='Biologia' />
                <Picker.Item value='Ciências' label='Ciências' />
                <Picker.Item value='Educação Física' label='Educação Física' />
                <Picker.Item value='Espanhol' label='Espanhol' />
                <Picker.Item value='Física' label='Física' />
                <Picker.Item value='Geografia' label='Geografia' />
                <Picker.Item value='História' label='História' />
                <Picker.Item value='Inglês' label='Inglês' />
                <Picker.Item value='Matemática' label='Matemática' />
                <Picker.Item value='Português' label='Português' />
                <Picker.Item value='Química' label='Química' />
              </Picker>
            </View>

            <View style={styles.inputGroup}>
              
              <View style={styles.inputBlock}>
              <Text style={styles.label}>Dia da semana</Text>
              {/* <TextInput
                value={weekDay}
                onChangeText={text => setWeekDay(text)}
                style={styles.input}
                placeholder='Qual o dia?'
                placeholderTextColor='#c1bccc'
              /> */}
              <View style={styles.input}>
                <Picker
                  selectedValue={weekDay}
                  style={{ height: 50, width: 120 }}
                  onValueChange={(itemValue, itemIndex) => setWeekDay(itemValue)}
                >
                  <Picker.Item value='0' label='Domingo' />
                  <Picker.Item value='1' label='Segunda-feira' />
                  <Picker.Item value='2' label='Terça-feira' />
                  <Picker.Item value='3' label='Quarta-feira' />
                  <Picker.Item value='4' label='Quinta-feira' />
                  <Picker.Item value='5' label='Sexta-feira' />
                  <Picker.Item value='6' label='Sábado' />
                </Picker>
              </View>
              </View>

              <View style={styles.inputBlock}>
              <Text style={styles.label}>Horário</Text>
              <TextInput
                value={time}
                onChangeText={text => setTime(text)}
                style={styles.input}
                placeholder='Qual o horário?'
                placeholderTextColor='#c1bccc'
              />
              </View>
            </View>

            <RectButton 
              onPress={handleFiltersSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
        
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return(
            <TeacherItem 
              key={teacher.id} 
              teacher={teacher}
              favorite={favorites.includes(teacher.id)}
            />
          )
        })}        

      </ScrollView>

    </View>
  )
}

export default TeacherList
