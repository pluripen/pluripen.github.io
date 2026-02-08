export const routes = {
  home: '/',
  publications: '/publikationen',
  series: (series: string) => `/publikationen/${series}`,
  volume: (series: string, volumeId: string) => `/publikationen/${series}/${volumeId}`,
  about: '/about',
  contact: '/kontakt',
  donation: '/donation',
  impressum: '/impressum',
} as const

export type RouteKey = keyof typeof routes

