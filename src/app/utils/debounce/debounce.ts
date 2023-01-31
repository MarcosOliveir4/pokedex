const debounceTimers: any = {};

export const debounce = (
  timer: number,
  callback: () => void,
  applyArgs?: [],
  context = {}
) => {
  if (timer && typeof callback === 'function') {
    const funcName = callback.name || 'unnamed_func';
    clearTimeout(debounceTimers[funcName]);
    debounceTimers[funcName] = setTimeout(() => {
      applyArgs ? callback.apply(context, applyArgs) : callback.call(context);
      delete debounceTimers[funcName];
    }, timer);
  }
};
