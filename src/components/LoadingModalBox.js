import React from 'react'
import matisse from '../style/matisse';
import ModalBox from './ModalBox'

export default props => {
    return (
        <ModalBox style={{ backgroundColor: matisse.cinzaEscuro }}
            textStyle={{ color: 'white' }}
            visible={props.visible} message={props.message} />
    );
}