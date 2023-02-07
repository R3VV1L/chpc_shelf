import React from 'react'
import { useContext, useEffect } from 'react'
import { Context } from '../main'

export default function LogOut() {
    const { store } = useContext(Context)
    store.logout()

}
