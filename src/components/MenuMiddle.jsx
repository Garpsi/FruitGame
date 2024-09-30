import React from 'react';

const MenuMiddle = () => {
  return (
    <div className="menu__middle">
      <div className="menu__automation">
        <h3 className="menu__automation__title">Automation</h3>
        <div className="automation__btns">
          <button className="automation__btn--big">Subscribe</button>
          <div className="automation__btns__small">
            <button className="automation__btn--small">Compound</button>
            <button className="automation__btn--small">Claim</button>
            <button className="automation__btn--small">Off</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuMiddle;
