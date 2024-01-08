import React from 'react';
import {RangeSlider, TextField} from '@shopify/polaris';
/**
 *
 * @param {*} param0
 * @returns
 */
export const RangeSliderWithText = ({label, value, suffix, onChange, type, helpText, max, min}) => {
  return (
    <RangeSlider
      label={label}
      value={value}
      output={max}
      max={max}
      helpText={helpText}
      onChange={onChange}
      min={min}
      suffix={
        <div style={{width: '150px'}}>
          <TextField suffix={suffix} type={type} value={String(value)} onChange={onChange} />
        </div>
      }
    />
  );
};

RangeSliderWithText.propTypes = {};

export default RangeSliderWithText;
