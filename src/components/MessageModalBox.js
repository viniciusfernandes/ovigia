import React from 'react'
import ModalBox from './ModalBox'

export default props => {
    return (
        <ModalBox visible={props.visible} message={props.message} onClose={props.onClose} />
    );
}