// TODO: use more formal solution instead?
export const evalCode = (code: string, scope: Record<string, any>) => {
  try {
    const scopeKeys = Object.keys(scope);
    const scopeValues = scopeKeys.map((key) => scope[key]);
    // eslint-disable-next-line no-new-func
    const res = new Function(...scopeKeys, code);
    return res(...scopeValues);
  } catch (err) {
    return {
      error: err,
    };
  }
};
