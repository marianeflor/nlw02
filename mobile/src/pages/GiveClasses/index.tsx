import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import giveClassesBgImg from '../../assets/images/give-classes-background.png'

import styles from './styles'

const GiveClasses = () => {

  const { goBack } = useNavigation()

  const handleNavigateBack = () => {
    goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground 
        resizeMode='contain'
        source={giveClassesBgImg} 
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton onPress={handleNavigateBack} style={styles.okBotton}>
        <Text style={styles.okBottonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses
