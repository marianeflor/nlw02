import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    backgroundColor: '#8257E5',
    padding: 40,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180,    
  },

  description: {
    fontFamily: 'Poppins_400Regular',
    color: '#d4c2ff',
    fontSize: 16,
    lineHeight: 26,
    maxWidth: 240, 
    marginTop: 24
  },

  okBotton: {
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  okBottonText: {
    fontFamily: 'Archivo_700Bold',
    color: '#FFF',
    fontSize: 16,
  },
})

export default styles