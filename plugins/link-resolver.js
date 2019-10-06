const LinkResolver = (doc, ctx) => {
  if (doc.isBroken) {
    return '/404';
  }
  if (doc.type === 'home') {
    return '/';
  }
  if (doc.type === 'about') {
    return '/about';
  }
  return '/404';
};

export default LinkResolver;
