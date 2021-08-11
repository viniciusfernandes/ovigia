import React, { useState } from 'react';
import {
    Text, TouchableOpacity,
} from 'react-native';
import EdicaoPerfil from '../EdicaoPerfil';
import LabelInput from '../../components/LabelInput'
import ImagemPerfil from '../../screens/ImagemPerfil';
import { criarVigia } from '../../services/vigia/vigia.services';

import styles from './styles/edicao.vigia.styles'

export default props => {
    const [vigia, setVigia] = useState({})

    return (
        <EdicaoPerfil >
            <ImagemPerfil />
            <LabelInput style={{ label: { marginTop: '2%' } }} titulo={'E-mail'}
                valor={vigia.email} onChangeText={email => setVigia({ ...vigia, email })} />
            <LabelInput titulo={'Celular'} valor={vigia.telefone} />
            <LabelInput titulo={'Senha'} valor={vigia.senha} />
            <TouchableOpacity style={styles.botaoSalvar}
                onPress={() => criarVigia(vigia, (data) => setVigia({}))}>
                <Text style={[styles.label, styles.botaoSalvarText]}>Salvar</Text>
            </TouchableOpacity>

        </EdicaoPerfil >
    )
}