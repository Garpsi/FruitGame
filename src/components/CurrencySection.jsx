import React from 'react';

const CurrencySection = ({ userAddress, farmBucks }) => {
  return (
    <div className="currency__container">
      <div className="address__container">
        <p className="user__address">{userAddress}</p>
      </div>
      <div className="currency__info--section">
        <p className="currency__text">FARMBUCKS</p>
        <p className="currency__number currency__farmbucks">{farmBucks}</p>
      </div>
    </div>
  );
};

export default CurrencySection;
