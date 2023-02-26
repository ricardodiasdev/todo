import React, { useState, useEffect } from "react";
import * as S from "./styles";

import api from "../../services/api";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

function QrCode() {
    return (
        <S.Container>
            <Header/>
            <S.Content>
                <h1>CAPTURE O QRCODE PELO APP</h1>
                <S.QrCodeArea></S.QrCodeArea>
                <p>Suas atividades serão sincronizadas com as do seu celular</p>
            </S.Content>
            <Footer/>
        </S.Container>
    )
}

export default QrCode; 
