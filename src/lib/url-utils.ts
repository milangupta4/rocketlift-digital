export const VALID_TLD = [
  'com', 'org', 'net', 'edu', 'gov', 'mil', 'io', 'co', 'ai', 'app',
  'dev', 'tech', 'info', 'biz', 'me', 'tv', 'us', 'uk', 'ca', 'au'
];

export const isValidDomain = (url: string): boolean => {
  // Remove any protocol and www if present
  const domainOnly = url.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Basic domain format validation
  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domainOnly)) return false;
  
  // Check if TLD is in allowed list
  const tld = domainOnly.split('.').pop()?.toLowerCase();
  return tld ? VALID_TLD.includes(tld) : false;
};

export const formatUrl = (url: string): string => {
  if (!/^https?:\/\//i.test(url)) {
    return `https://${url}`;
  }
  return url;
}; 