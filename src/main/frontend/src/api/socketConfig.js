// src/api/socketConfig.js

const isDev = process.env.NODE_ENV === 'development';

// 개발 환경이면 localhost, 배포면 현재 호스트
export const SOCKET_BASE_URL = isDev ? 'http://localhost:8080/chat' : '/chat'; // Nginx에서 프록시될 경우
