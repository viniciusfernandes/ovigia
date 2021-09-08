import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';


export default () => {
    const { signed } = useContext(AuthContext)
    return !signed ? <AppRoute /> : <AuthRoute />
}