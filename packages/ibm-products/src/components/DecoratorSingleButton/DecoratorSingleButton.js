/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import { DecoratorBase } from '../DecoratorBase';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { prepareProps } from '../../global/js/utils/props-helper';
import { pkg } from '../../settings';

const componentName = 'DecoratorSingleButton';

const defaults = {
  onClick: () => {},
  onContextMenu: () => {},
  scoreThresholds: [0, 4, 7, 10],
  theme: 'light',
};

/**
 * The DecoratorSingleButton groups a key/value pair to behave like a button.
 */
export let DecoratorSingleButton = React.forwardRef(
  (
    {
      onClick = defaults.onClick,
      onContextMenu = defaults.onContextMenu,
      scoreThresholds = defaults.scoreThresholds,
      theme = defaults.theme,
      ...rest
    },
    ref
  ) => {
    const validProps = prepareProps(rest, [
      'href',
      'kind',
      'onClickLabel',
      'onClickValue',
      'onContextMenuLabel',
      'onContextMenuValue',
    ]);

    return (
      <DecoratorBase
        ref={ref}
        {...validProps}
        kind="single-button"
        {...{ onClick, onContextMenu, scoreThresholds, theme }}
        {...getDevtoolsProps(componentName)}
      />
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
DecoratorSingleButton = pkg.checkComponentEnabled(
  DecoratorSingleButton,
  componentName
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
DecoratorSingleButton.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DecoratorSingleButton.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * `disabled` only applies if `kind` is "single-button" or "dual-button".
   */
  disabled: PropTypes.bool,

  /**
   * Do not show the icon, regardless of score.
   */
  hideIcon: PropTypes.bool,

  /**
   * The label for the data.
   */
  label: PropTypes.string,

  /**
   * Optional callback function.
   * Returns two objects: `event` and `{ score, label, value, magnitude }`
   */
  onClick: PropTypes.func,

  /**
   * Optional callback function.
   * Returns two objects: `event` and `{ score, label, value, magnitude }`
   */
  onContextMenu: PropTypes.func,

  /**
   * Used in conjunction with `scoreThresholds`, determines the color, shape, and type of magnitude of the icon.
   *
   * If you don't want to show the icon at all, set `hideIcon={true}`.
   */
  score: PropTypes.number,

  /**
   * Used in conjunction with `score`, determines the color, shape, and type of magnitude of the icon.
   *
   * An array of 4 numbers determines the range of thresholds.
   *
   * Example using `[0, 4, 7, 10]`:
   * <br/>- `<= 0` "Benign"
   * <br/>- `1-3` "Low"
   * <br/>- `4-6` "Medium"
   * <br/>- `7-9` "High"
   * <br/>- `>= 10` "Critical"
   * <br/>- `NaN` "Unknown"
   */
  scoreThresholds: PropTypes.arrayOf(PropTypes.number),

  /**
   * Optional callback function for building a more detailed descriptive text.
   * Returns `score`, `scoreThresholds`, `magnitude`.
   *
   * Typical description is in the form of
   * '"(magnitude)" magnitude: score (score) out of (last element of scoreThresholds array)'.
   *
   * E.g. `"Medium" magnitude: score 5 out of 10`.
   *
   * If not defined, the title will default to the `label` prop.
   */
  setLabelTitle: PropTypes.func,

  /**
   * Styled smaller to better fit inline with text.
   */
  small: PropTypes.bool,

  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf(['light', 'dark']),

  /**
   * If not defined, it will behave as `display:inline-block`.
   */
  truncateValue: PropTypes.oneOfType([
    PropTypes.oneOf(['end', 'start']),
    PropTypes.shape({
      maxLength: PropTypes.number,
      front: PropTypes.number,
      back: PropTypes.number,
    }),
  ]),

  /**
   * The value of the data.
   */
  value: PropTypes.string.isRequired,

  /**
   * Overrides the default title for the Decorator's value.
   */
  valueTitle: PropTypes.string,
};
