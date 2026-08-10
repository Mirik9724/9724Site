import '../css/normalize.css';
import '../css/styles.css';
import '../css/mlg-v1.css';

export const metadata = {
    title: 'Mirik9724',
    description: 'Mirik9724 - "I\'m people"',
    icons: {
        icon: '/img/logo/mi.png',
    },
    keywords: [
        'Mirik9724', 'Mirik', 'Мирик', 'мирик9724', 'Mirik9724 RU', 'Mirik9724 net',

        'Minecraft Developer', 'Java Developer', 'Kotlin Developer', 'Spigot Plugins', 'Paper Plugins', 'Fabric Mods', 'Forge Mods',

        'ShulkerPro', 'Whitelist Ultra', 'MouseLock', 'ChatSplitter', 'PlayerMonitor Ultra', 'PortalLock', 'MirikAPI', 'Compilator for RP',

        'Mirik9724 музыка', 'Альбом Пробы', 'Дюны Mirik9724', 'Новый день Mirik9724', 'Перецензурено', 'ГОРОТО', 'Mirik9724 Spotify', 'Mirik9724 Яндекс Музыка'
    ],
    twitter: {
        card: 'summary_large_image',
        title: 'Mirik9724',
        description: 'Mirik9724 - "I\'m people"',
        images: ['https://mirik9724.net /img/pre.png'],
    },
    openGraph: {
        title: 'Mirik9724',
        description: 'Mirik9724 - "I\'m people"',
        url: 'https://mirik9724.net /',
        images: ['https://mirik9724.net /img/pre.png'],
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <head>
            <meta name="theme-color" content="#9311bc" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Mirik9724",
                        "url": "https://mirik9724.net ",
                        "logo": "https://mirik9724.net/img/logo/mi.png",
                        "description": "Mirik9724 - \"I\'m people\"",
                        "sameAs": [

                        ]
                    })
                }}
            />
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
