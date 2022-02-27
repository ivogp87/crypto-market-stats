const formatLinkAnchor = (url) => {
  if (!url || typeof url !== 'string') return '';

  const linkMatches = url.match(/https?:\/\/(?:www.)?(.+)\//i);

  if (!linkMatches) return url;

  return linkMatches[1];
};

export default formatLinkAnchor;
