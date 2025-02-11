/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://rocketlift.co',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/404'],
} 