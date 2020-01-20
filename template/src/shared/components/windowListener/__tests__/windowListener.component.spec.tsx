import React from 'react';
import { empty } from 'ramda';
import throttle from 'lodash.throttle';
import { WindowListener, WindowListenerProps } from '../windowListener.component';
import { makePropsRenderer } from '../../../utils/testUtils';

jest.mock('lodash.throttle', () => jest.fn().mockImplementation(fn => fn));

describe('WindowListener: Component', () => {
  const defaultProps = {
    throttle: 100,
    onEvent: empty as () => void,
    eventType: 'scroll',
    options: { foo: 'bar' },
  };

  const component = (props: Partial<WindowListenerProps>) => <WindowListener {...defaultProps} {...props} />;
  const render = makePropsRenderer(component);

  // @ts-ignore
  const addEventListenerSpy = jest.spyOn(global.window, 'addEventListener');
  // @ts-ignore
  const removeEventListenerSpy = jest.spyOn(global.window, 'removeEventListener');

  it('should render nothing', () => {
    const { container } = render();
    expect(container.firstChild).toBe(null);
  });

  it('should call addEventListener with proper eventType on mount', () => {
    render();
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), defaultProps.options);
  });

  it('should call removeEventListener with proper eventType on unmount', () => {
    const el = render();
    el.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), defaultProps.options);
  });

  describe('when no throttling is provided', () => {
    it('should call addEventListener with provided function on mount', () => {
      const onEvent = (): void => null;
      render({ onEvent, throttle: 0 });
      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', onEvent, defaultProps.options);
    });

    it('should call removeEventListener with provided function on mount', () => {
      const onEvent = (): void => null;
      const el = render({ onEvent, throttle: 0 });
      el.unmount();
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', onEvent, defaultProps.options);
    });
  });

  describe('when throttle is provided', () => {
    it('should call throttle on given function', () => {
      const onEvent = (): void => null;
      render({ onEvent });
      expect(throttle).toHaveBeenCalledWith(onEvent, defaultProps.throttle, expect.anything());
    });
  });
});