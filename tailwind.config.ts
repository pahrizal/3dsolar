import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          base: 'hsl(228 15% 4%)',
          surface: 'hsl(228 15% 7%)',
          raised: 'hsl(228 15% 10%)',
          elevated: 'hsl(228 15% 13%)',
          overlay: 'hsl(228 15% 16%)',
          spotlight: 'hsl(228 15% 19%)',
        },
        accent: {
          DEFAULT: 'hsl(220 90% 60%)',
          muted: 'hsl(220 70% 50%)',
          light: 'hsl(220 90% 70%)',
        },
        text: {
          primary: 'hsl(0 0% 95%)',
          secondary: 'hsl(0 0% 70%)',
          tertiary: 'hsl(0 0% 50%)',
          muted: 'hsl(0 0% 35%)',
        },
        success: 'hsl(160 70% 50%)',
        warning: 'hsl(40 90% 55%)',
        destructive: 'hsl(0 70% 55%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
