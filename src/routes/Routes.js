import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';


export default () => {
    const { signed } = useContext(AuthContext)
    console.info('routes signed: ' + signed)
    return !signed ? <AppRoute /> : <AuthRoute />
}