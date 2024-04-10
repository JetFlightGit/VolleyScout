import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/styles'
import colors from '@/constants/colors'

const Page = () => {

  return (
    <View style={styles.container}>
      <ImageBackground source={require('@/assets/images/VolleyballSignup.jpg')} style={styles.image}>
        <View style={{paddingTop: 650, paddingLeft: 20}}>
          <Text style={styles.header}>Welcome to VolleyScout!</Text>
        </View>
        <View style={[styles.buttons, {paddingTop: 30}]}>
          <Link href={'/signup'} style={[defaultStyles.pillButton, {flex:1, backgroundColor: colors.dark}]} asChild>
            <TouchableOpacity>
              <Text style={{color: 'white', fontSize: 22, fontWeight: '500'}}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
          <Link href={'/login'} style={[defaultStyles.pillButton, {flex:1, backgroundColor: colors.dark}]} asChild>
            <TouchableOpacity>
              <Text style={{color: 'white', fontSize: 22, fontWeight: '500'}}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    justifyContent: 'space-between',
    backgroundColor: 'grey',
  },
  image: { 
    width: '100%',
    height: '100%',
  },
  header: {
    fontSize: 40,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent:'center',
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  }
})

export default Page