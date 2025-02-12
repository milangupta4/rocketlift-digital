/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.rocketlift.co',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  outDir: './out',
  exclude: ['/404'],
} 