// jsdom no implementa matchMedia; necesario para GSAP ScrollTrigger
// En tests forzamos prefers-reduced-motion para que GSAP se salte animaciones y no haga warnings
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}