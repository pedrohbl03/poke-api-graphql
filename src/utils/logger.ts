const info = (...params: unknown[]) => {
  console.info('📢 INFO:', ...params);
};

const error = (...params: unknown[]) => {
  console.error('🚨 ERROR:', ...params);
};

const warn = (...params: unknown[]) => {
  console.warn('⚠️ WARN:', ...params);
};

export default {
  info,
  error,
  warn,
}