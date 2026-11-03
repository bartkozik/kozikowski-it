import localFont from 'next/font/local';

export const rubikHeading = localFont({
  src: './fonts/rubik-800-latin-pl.woff2',
  weight: '800',
  style: 'normal',
  display: 'swap',
  variable: '--font-heading',
});

export const montserratBody = localFont({
  src: [
    {
      path: './fonts/montserrat-400-latin-pl.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/montserrat-500-latin-pl.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-body',
});

export const interMetrics = localFont({
  src: './fonts/inter-400-latin-pl.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-metrics',
});

export const fontVariables = `${rubikHeading.variable} ${montserratBody.variable} ${interMetrics.variable}`;
