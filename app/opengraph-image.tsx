import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Cognitive Fingerprint - Stefan & Angela Leadership Dashboard';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: 'linear-gradient(#ffb829 1px, transparent 1px), linear-gradient(90deg, #ffb829 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
          }}
        >
          {/* Logo/Fingerprint icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffb829 0%, #e6a625 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 40,
              boxShadow: '0 20px 60px rgba(255, 184, 41, 0.3)',
            }}
          >
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                fill="#1a1a1a"
              />
            </svg>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: 'white',
                fontFamily: 'system-ui',
              }}
            >
              Cognitive{' '}
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: '#ffb829',
                fontFamily: 'system-ui',
                marginLeft: 16,
              }}
            >
              Fingerprint
            </span>
            <span
              style={{
                fontSize: 32,
                color: '#ffb829',
                marginLeft: 8,
                marginTop: -20,
              }}
            >
              ™
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#888888',
              marginBottom: 40,
              fontFamily: 'system-ui',
            }}
          >
            Leadership Interface Map
          </div>

          {/* Names */}
          <div
            style={{
              display: 'flex',
              gap: 40,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                borderRadius: 16,
                backgroundColor: 'rgba(255, 184, 41, 0.1)',
                border: '1px solid rgba(255, 184, 41, 0.2)',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#ffb829',
                }}
              />
              <span style={{ color: 'white', fontSize: 24, fontFamily: 'system-ui' }}>
                Stefan
              </span>
            </div>
            
            <span style={{ color: '#666', fontSize: 24 }}>×</span>
            
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '16px 32px',
                borderRadius: 16,
                backgroundColor: 'rgba(136, 136, 136, 0.1)',
                border: '1px solid rgba(136, 136, 136, 0.2)',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#888888',
                }}
              />
              <span style={{ color: 'white', fontSize: 24, fontFamily: 'system-ui' }}>
                Angela
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

