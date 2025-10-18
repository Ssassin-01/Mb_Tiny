export const S3_BASE =
  'https://mbtiny-image-bucket.s3.ap-northeast-2.amazonaws.com/';

export function toImageUrl(u) {
  if (!u) return S3_BASE + 'profile/default.png';
  if (u.startsWith('http://') || u.startsWith('https://')) return u;
  if (u.startsWith('/profile/')) return S3_BASE + u.slice(1);
  if (!u.startsWith('/')) return S3_BASE + u;
  return 'http://localhost:8080' + u;
}

export default toImageUrl;
