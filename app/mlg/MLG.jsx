'use client';
import Footer from "../menu/Footer.jsx";
import Header from "../menu/Header.jsx";

export default function Home() {
    return (
        <>
            <Header/>
            <div className="center-hor">
                <div className="mlg-v1">
                    <h2>MiLiquid Glass</h2>
                    <p>Новый дизайн EVS</p>
                </div>
                <div className="mlg-v1">
                    <h2>Пример жидкого стекла mgl-v1-1</h2>
                    <p>Если вы это прочитали значит</p>
                    <p>Вам делать нечего</p>
                    <button className="mlg-v1-button">Нажми меня</button>
                </div>
            </div>

            <Footer/>
        </>
    );
}
