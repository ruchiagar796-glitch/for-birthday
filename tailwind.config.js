/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0a0118',
          800: '#150529',
          700: '#1f0a3d',
          600: '#2a0f52',
        },
        blush: {
          50: '#fff5fb',
          100: '#ffe4f1',
          200: '#ffc6e0',
          300: '#ff9ecb',
          400: '#ff6fae',
          500: '#ff3d8f',
          600: '#e6217a',
          700: '#b81561',
        },
        gold: {
          100: '#fff7d6',
          200: '#ffea9e',
          300: '#ffd966',
          400: '#f5c43a',
          500: '#d9a51a',
        },
        lavender: {
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        },
      },
      fontFamily: {
        display: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        hand: ['"Caveat"', 'cursive'],
        body: ['"Quicksand"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glowPink: '0 0 40px rgba(255,61,143,0.45)',
        glowGold: '0 0 40px rgba(245,196,58,0.45)',
        glowSoft: '0 10px 40px rgba(0,0,0,0.45)',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatYsm: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        driftUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(-120vh)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-7px)' },
          '80%': { transform: 'translateX(7px)' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 20px rgba(255,61,143,0.4)' },
          '50%': { boxShadow: '0 0 45px rgba(255,61,143,0.8)' },
        },
        lidOpen: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-110deg)' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        heartUp: {
          '0%': { transform: 'translateY(0) scale(0.6)', opacity: '0' },
          '20%': { opacity: '1' },
          '100%': { transform: 'translateY(-200px) scale(1.1)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        flameFlicker: {
          '0%,100%': { transform: 'scale(1) rotate(-1deg)', opacity: '1' },
          '50%': { transform: 'scale(1.08) rotate(2deg)', opacity: '0.9' },
        },
        sealPulse: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.12)' },
        },
        caretBlink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sway: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bokehFloat: {
          '0%': { transform: 'translate(0,0)', opacity: '0.3' },
          '50%': { opacity: '0.7' },
          '100%': { transform: 'translate(20px,-30px)', opacity: '0.3' },
        },
      },
      animation: {
        floatY: 'floatY 4s ease-in-out infinite',
        floatYsm: 'floatYsm 3s ease-in-out infinite',
        twinkle: 'twinkle 2.5s ease-in-out infinite',
        driftUp: 'driftUp linear infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out both',
        fadeIn: 'fadeIn 0.8s ease-out both',
        scaleIn: 'scaleIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        shake: 'shake 0.5s ease-in-out',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        lidOpen: 'lidOpen 0.9s ease-out forwards',
        pop: 'pop 0.4s ease-out forwards',
        heartUp: 'heartUp 2s ease-out forwards',
        shimmer: 'shimmer 3s linear infinite',
        flameFlicker: 'flameFlicker 0.25s ease-in-out infinite',
        sealPulse: 'sealPulse 1.4s ease-in-out infinite',
        caretBlink: 'caretBlink 0.8s step-end infinite',
        spinSlow: 'spinSlow 8s linear infinite',
        sway: 'sway 3s ease-in-out infinite',
        bokehFloat: 'bokehFloat 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
