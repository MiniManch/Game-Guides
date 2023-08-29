import React from 'react';
import css from './Style/ShopAt.module.css';

const ShopAt = () => {
  return (
    <div className={`${css.main}`}>
      <div className={css.shop_at}>
        <h1 className={css.shop_at_title}>
          Shop at <span className={css.greenish}>GG</span>
        </h1>
        <p className={css.shop_at_text}>
          Discover top-tier game guides at GG. From tips to beginner till advanced guides, we've got you covered. Explore our catalogue!
        </p>
        <a href='#' className={css.guides_collection}>
          <p className={css.collection_text}>OUR GUIDES COLLECTION</p>
          <div className={css.arrow}></div>
        </a>
      </div>
    </div>
  );
};

export default ShopAt;
