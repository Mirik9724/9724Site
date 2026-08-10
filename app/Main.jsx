'use client';
import Header from "./menu/Header.jsx";
import Footer from "./menu/Footer.jsx";
import React from "react";

function Main() {
    return (
        <div className="App">
            <Header />
            <main style={{ padding: '20px 0' }}>
                <div className="center-hor">
                    <div className="mlg-v1">
                        <h2>Mirik9724</h2>
                        <h3>Developer & Creator</h3>
                        <p>
                            Разработка модов и плагинов для Minecraft, основатель сервера Ender Vanilla, музыка и контент
                        </p>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Main;