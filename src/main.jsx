import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// 旧 CRA 版が登録した service worker を掃除する。
// (キャッシュされた古いビルドが配信され続けるのを防ぐ)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
            registration.unregister();
        }
    });
}

createRoot(document.getElementById('root')).render(<App/>);
