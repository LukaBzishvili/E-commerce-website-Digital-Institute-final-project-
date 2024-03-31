import React, { useState } from "react";

const PriceValue = () => {
  const [lowerVal, setLowerVal] = useState<number>(100);
  const [upperVal, setUpperVal] = useState<number>(500);

  const handleUpperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (newValue < lowerVal + 4) {
      setLowerVal(newValue - 4);
      if (lowerVal === 100) {
        setUpperVal(104);
      }
    } else {
      setUpperVal(newValue);
    }
  };

  const handleLowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    if (newValue > upperVal - 4) {
      setUpperVal(newValue + 4);
      if (upperVal === 500) {
        setLowerVal(496);
      }
    } else {
      setLowerVal(newValue);
    }
  };

  return (
    <div className="wrapper">
      <fieldset className="filter-price">
        <div className="price-field">
          <input
            type="range"
            min={100}
            max={500}
            value={lowerVal}
            onChange={handleLowerChange}
            id="lower"
          />
          <input
            type="range"
            min={100}
            max={500}
            value={upperVal}
            onChange={handleUpperChange}
            id="upper"
          />
        </div>
        <div className="price-wrap">
          <span className="price-title">FILTER</span>
          <div className="price-wrap-1">
            <input id="one" value={lowerVal} readOnly />
            <label htmlFor="one">$</label>
          </div>
          <div className="price-wrap_line">-</div>
          <div className="price-wrap-2">
            <input id="two" value={upperVal} readOnly />
            <label htmlFor="two">$</label>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default PriceValue;
