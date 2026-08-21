export const isDeployed = process.env.NODE_ENV === 'production';
export const deploymentDomain = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'