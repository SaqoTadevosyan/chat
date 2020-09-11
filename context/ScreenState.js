import React, { useReducer } from 'react'
import { ScreenContext } from './screenContext'
import { screenReducer } from './screenReducer'
import { CHANGE_SCREEN } from './type'

export const ScreenState = ({ children }) => {
  const [state, dispatch] = useReducer(screenReducer, "login")

  const changeScreen = id => dispatch({ type: CHANGE_SCREEN, payload: id })

  return (
    <ScreenContext.Provider
      value={{
        changeScreen,
        screenName: state
      }}
    >
      {children}
    </ScreenContext.Provider>
  )
}
