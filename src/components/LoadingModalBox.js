import React from 'react'
import matisse from '../style/matisse';
import ModalBox from './ModalBox'

export default props => {
    return (
        <ModalBox style={{
            backgroundColor: matisse.cinzaEscuro,
            borderWidth: 2,
            borderColor: matisse.cinzaClaro
        }}
            textStyle={{ color: 'white' }}
            visible={props.visible} message={props.message} />
    );
}