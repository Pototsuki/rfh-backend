const parseMeta = (meta) => {
  if (!meta) return null;
  if (typeof meta !== 'string') return meta; 
  try {
    const parsed = JSON.parse(meta);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed;
    }
    return meta;
  } catch {
    return meta;
  }
}

module.exports = { parseMeta }