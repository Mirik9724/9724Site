'use client';
import React, { useState, useEffect } from "react";
import Footer from "../menu/Footer.jsx";
import Header from "../menu/Header.jsx";

export default function Projects() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    // Подгружаем IT-продукты из манифеста
    useEffect(() => {
        fetch('/data/manifest.json')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки IT-манифеста", err);
                setLoading(false);
            });
    }, []);

    // Фильтрация только по IT-категориям
    const filteredItems = filter === "all"
        ? items
        : items.filter(item => item.type === filter);

    // Цветовая индикация стека технологий / типов IT-продуктов
    const getBadgeStyle = (type) => {
        switch (type) {
            case 'mod': return { background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)' };
            case 'plugin': return { background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.4)' };
            case 'web': return { background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.4)' };
            case 'tool': return { background: 'rgba(250, 204, 21, 0.2)', color: '#fde047', border: '1px solid rgba(250, 204, 21, 0.4)' };
            default: return { background: 'rgba(255,255,255,0.1)', color: '#fff' };
        }
    };

    return (
        <>
            <Header />
            <div style={{ minHeight: '85vh', padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>

                {/* Заголовок */}
                <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>IT Проекты & Разработки</h1>
                    <p style={{ opacity: 0.7 }}>Моды, плагины, веб-сервисы и софт от Mirik9724</p>
                </div>

                {/* IT-Фильтры */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
                    {[
                        { id: 'all', label: '💻 Все IT-продукты' },
                        { id: 'mod', label: '🎮 Моды (Fabric/Forge)' },
                        { id: 'plugin', label: '🔌 Плагины (Spigot/Paper)' },
                        { id: 'web', label: '🌐 Веб & Сайты' },
                        { id: 'tool', label: '🛠️ Софт & Утилиты' }
                    ].map(btn => (
                        <button
                            key={btn.id}
                            onClick={() => setFilter(btn.id)}
                            style={{
                                padding: '10px 18px',
                                borderRadius: '20px',
                                border: filter === btn.id ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                                background: filter === btn.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(18, 18, 22, 0.6)',
                                color: '#fff',
                                backdropFilter: 'blur(10px)',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>

                {/* Сетка IT-карточек (Grid) */}
                {loading ? (
                    <p style={{ textAlign: 'center', opacity: 0.6 }}>Загрузка продуктов...</p>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '25px'
                    }}>
                        {filteredItems.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    background: 'rgba(18, 18, 22, 0.5)',
                                    backdropFilter: 'blur(16px)',
                                    WebkitBackdropFilter: 'blur(16px)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                                    transition: 'transform 0.2s ease'
                                }}
                            >
                                <div>
                                    {/* Категория + Язык */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '12px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            ...getBadgeStyle(item.type)
                                        }}>
                                            {item.category}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.5, fontFamily: 'monospace' }}>
                                            {item.lang}
                                        </span>
                                    </div>

                                    {/* Название */}
                                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', color: '#fff' }}>
                                        {item.name}
                                    </h3>

                                    {/* Описание */}
                                    <p style={{ fontSize: '0.9rem', color: '#a1a1aa', lineHeight: 1.5, marginBottom: '20px' }}>
                                        {item.desc}
                                    </p>

                                    {/* Теги стек-технологий */}
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                        {item.tags?.map((tag, idx) => (
                                            <span key={idx} style={{
                                                background: 'rgba(255,255,255,0.06)',
                                                padding: '2px 8px',
                                                borderRadius: '6px',
                                                fontSize: '0.75rem',
                                                color: '#d4d4d8',
                                                fontFamily: 'monospace'
                                            }}>
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Кнопки репозитория и скачивания */}
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '15px' }}>
                                    {item.links?.github && (
                                        <a href={item.links.github} target="_blank" rel="noreferrer" className="btn-link">
                                            📂 GitHub
                                        </a>
                                    )}
                                    {item.links?.curseforge && (
                                        <a href={item.links.curseforge} target="_blank" rel="noreferrer" className="btn-link">
                                            🔥 CurseForge
                                        </a>
                                    )}
                                    {item.links?.spigot && (
                                        <a href={item.links.spigot} target="_blank" rel="noreferrer" className="btn-link">
                                            🔌 SpigotMC
                                        </a>
                                    )}
                                    {item.links?.site && (
                                        <a href={item.links.site} target="_blank" rel="noreferrer" className="btn-link">
                                            🌐 Открыть сайт
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />

            <style jsx>{`
                .btn-link {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                    padding: 6px 12px;
                    border-radius: 8px;
                    text-decoration: none;
                    font-size: 0.8rem;
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.2s ease;
                }
                .btn-link:hover {
                    background: rgba(168, 85, 247, 0.3);
                    border-color: #a855f7;
                }
            `}</style>
        </>
    );
}