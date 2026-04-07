// 📡 Middleware to parse JSON string fields back into objects (useful for FormData!)
export const parseJsonFields = (fields) => (req, res, next) => {
  fields.forEach(field => {
    if (req.body[field] && typeof req.body[field] === 'string') {
      try {
        req.body[field] = JSON.parse(req.body[field]);
      } catch (e) {
        // Just keep it as a string if it fails parsing
      }
    }
  });
  next();
};
