import { Poppins } from 'next/font/google';
import { Libre_Bodoni } from 'next/font/google';

export const poppinsFont = Poppins({
  adjustFontFallback: true,
  preload: true,
  weight: ['400', '700'],
  fallback: ['sans-serif'],
  subsets: ['latin'],
});

export const bodoniFont = Libre_Bodoni({
  adjustFontFallback: true,
  preload: true,
  weight: 'variable',
  fallback: ['serif'],
  subsets: ['latin'],
});
