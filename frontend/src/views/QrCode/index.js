import React, { useState, useEffect } from "react";
import * as S from "./styles";

import api from "../../services/api";
import Qr from 'qrcode.react';

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function QrCode() {
    return (
        <S.Container>
            <Header/>
            <S.Content>
                <h1>CAPTURE O QRCODE PELO APP</h1>
                <p>Suas atividades serão sincronizadas com as do seu celular</p>
                <S.QrCodeArea>
                    <Qr value='getmacaddress' size={350}/>
                </S.QrCodeArea>
                <S.ValidationCode>
                    <span>Digite a numeração que apareceu no celular</span>
                    <input type="text" />
                    <button>Sincronizar</button>
                </S.ValidationCode>
            </S.Content>
            <Footer/>
        </S.Container>
    )
}

export default QrCode; 
