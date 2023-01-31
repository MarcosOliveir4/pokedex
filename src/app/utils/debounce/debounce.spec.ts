import { debounce } from './debounce';

describe('debounce', () => {
  it('should call the callback after the specified delay', () => {
    const callback = jest.fn();
    jest.useFakeTimers();
    debounce(1000, callback);
    jest.advanceTimersByTime(999);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
    jest.clearAllTimers();
  });
});
