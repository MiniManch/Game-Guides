import React from 'react';
import { Grid, Typography } from '@mui/material';
import css from './Style/PopularGuides.module.css';

const PopularGuides = () => {
  return (
    <div className={`${css.main}`}>
      <div className={css.popular_guides}>
        <Typography variant="h1" className={css.popular_guides_title}>
          Our Popular Guides!
        </Typography>
        <div className={css.grid_container}>
          {/* Replace these images with your actual images */}
          <div className={css.grid_item}>
            <img src="https://cdn2.iconfinder.com/data/icons/popular-games-1/50/rocketleague_squircle-512.png" alt="Guide 1" className={css.guide_image} />
          </div>
          <div className={css.grid_item}>
            <img src="https://assets-prd.ignimgs.com/2023/06/09/fortnitewilds-1686353306240.jpg" alt="Guide 2" className={css.guide_image} />
          </div>
          <div className={css.grid_item}>
            <img src="https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.jpg" alt="Guide 3" className={css.guide_image} />
          </div>
          <div className={css.grid_item}>
            <img src="https://icon-library.com/images/league-of-legends-icon-png/league-of-legends-icon-png-23.jpg" alt="Guide 4" className={css.guide_image} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PopularGuides;
