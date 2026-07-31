'use client';

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: any[]) => {
    const firstArg = args[0];
    if (typeof firstArg === 'string' && (
      firstArg.includes('Encountered a script tag') || 
      firstArg.includes('Cannot render a sync or defer') ||
      firstArg.includes('suppressHydrationWarning')
    )) {
      return;
    }
    orig.apply(console, args);
  };
}

export default function ConsoleSuppressor() {
  return null;
}
