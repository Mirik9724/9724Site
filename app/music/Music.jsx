'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/app/menu/Header";
import Footer from "@/app/menu/Footer";

const SERVICE_META = {
    yandex: { name: "Яндекс Музыка", icon: "/img/logo/yandex.webp" },
    spotify: { name: "Spotify", icon: "/img/logo/spotify.png" },
    apple: { name: "Apple Music", icon: "/img/logo/Apple_Music_icon.svg.webp" },
    vk: { name: "VK Музыка", icon: "/icons/vk.svg" },
    youtube: { name: "YouTube Music", icon: "/img/logo/Youtube.webp" },
    soundcloud: { name: "SoundCloud", icon: "/icons/soundcloud.svg" }
};

function MusicContent() {
    const searchParams = useSearchParams();
    const activeId = searchParams.get('id');

    const [releases, setReleases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [shared, setShared] = useState(false);

    useEffect(() => {
        fetch('/data/releases.json')
            .then(res => res.json())
            .then(data => {
                setReleases(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Ошибка загрузки дискографии", err);
                setLoading(false);
            });
    }, []);

    const activeRelease = releases.find(r => r.id === activeId);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `${activeRelease?.artist} - ${activeRelease?.title}`,
                url: window.location.href
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShared(true);
            setTimeout(() => setShared(false), 2000);
        }
    };

    const filteredReleases = releases.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.artist && r.artist.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (loading) {
        return (
            <div className="center-hor" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="mlg-v1"><h3>Загрузка дискографии...</h3></div>
            </div>
        );
    }

    /* ------------------------------------------------------------- */
    /* РЕЖИМ 1: Смарт-карточка конкретного релиза (?id=proby)         */
    /* ------------------------------------------------------------- */
    if (activeRelease) {
        return (
            <div className="center-hor" style={{ minHeight: '75vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px 10px' }}>
                <section className="mlg-v1" style={{ maxWidth: '440px', width: '100%', padding: '28px 20px' }}>

                    <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                        <Link href="/music" style={{ textDecoration: 'none' }}>
                            <button className="mlg-v1-button" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                                ← Все релизы
                            </button>
                        </Link>
                    </div>

                    <img
                        src={activeRelease.cover}
                        alt={activeRelease.title}
                        style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            objectFit: 'cover',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.4)'
                        }}
                    />

                    <h2>{activeRelease.artist || "Mirik9724"}</h2>
                    <h3>{activeRelease.title}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.85, marginBottom: '15px' }}>
                        {activeRelease.description}
                    </p>

                    {/* Вывод треклиста, если это альбом */}
                    {activeRelease.tracklist && (
                        <div style={{ textAlign: 'left', margin: '15px 0', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#c084fc', display: 'block', marginBottom: '8px' }}>
                                🎵 Треклист альбома:
                            </span>
                            <ul style={{ padding: 0, margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                                {activeRelease.tracklist.map((track, i) => (
                                    <li key={i} style={{ margin: '4px 0' }}>{track}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Список всех музыкальных сервисов */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', margin: '20px 0' }}>
                        {Object.entries(activeRelease.links || {}).map(([key, url]) => {
                            const meta = SERVICE_META[key] || { name: key, icon: "/icons/music.svg" };
                            return (
                                <a key={key} href={url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', width: '100%' }}>
                                    <button className="mlg-v1-button" style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '12px 16px',
                                        textTransform: 'none'
                                    }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={meta.icon} alt={meta.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                                            <span style={{ fontWeight: '600' }}>{meta.name}</span>
                                        </span>
                                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Слушать →</span>
                                    </button>
                                </a>
                            );
                        })}
                    </div>

                    <button onClick={handleShare} className="mlg-v1-button" style={{ width: '100%', fontSize: '0.85rem' }}>
                        {shared ? '✅ Ссылка скопирована!' : '🔗 Поделиться релизом'}
                    </button>
                </section>
            </div>
        );
    }

    /* ------------------------------------------------------------- */
    /* РЕЖИМ 2: Общий Каталог всех релизов                             */
    /* ------------------------------------------------------------- */
    return (
        <div className="center-hor" style={{ minHeight: '75vh', paddingBottom: '40px' }}>
            <section className="mlg-v1" style={{ marginBottom: '30px' }}>
                <h2>Mirik9724</h2>
                <h3>Дискография & Релизы</h3>
                <p>Все официальные альбомы и синглы в одном месте.</p>

                {releases.length > 2 && (
                    <div style={{ marginTop: '20px' }}>
                        <input
                            type="text"
                            className="mlg-v1-input"
                            placeholder="Поиск по названию релизов..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                )}
            </section>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
                {filteredReleases.map((rel) => (
                    <section key={rel.id} className="mlg-v1" style={{ flex: '1 1 260px', margin: '10px', maxWidth: '320px' }}>
                        <img
                            src={rel.cover}
                            alt={rel.title}
                            style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: '16px', marginBottom: '15px' }}
                        />
                        <h2>{rel.title}</h2>
                        <h3>{rel.type} • {rel.year}</h3>

                        <Link href={`/music?id=${rel.id}`} style={{ textDecoration: 'none' }}>
                            <button className="mlg-v1-button" style={{ width: '100%', marginTop: '10px', fontSize: '0.85rem' }}>
                                Слушать релиз →
                            </button>
                        </Link>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default function MusicPage() {
    return (
        <main>
            <Header />
            <Suspense fallback={
                <div className="center-hor" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="mlg-v1"><h3>Загрузка...</h3></div>
                </div>
            }>
                <MusicContent />
            </Suspense>
            <Footer />
        </main>
    );
}