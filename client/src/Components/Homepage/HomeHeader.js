import React from 'react';
import { Typography, Button, Link } from '@mui/material';
import css from './Style/HomeHeader.module.css'; // Create this file to add custom styles

const HomeHeader = () => {
  return (
    <div className={`${css.main}`}>
      <div className={`${css.home_header}`}>
        <Link href="#">
          <img className={`${css.logo}`} src="https://i.ibb.co/fGG0XcC/LOGO.png" alt="Logo" />
        </Link>
        <div className={`${css.header_text}`}>
          <Typography className={`${css.header_title}`} variant="h6" component="h4">
            Game Guides
          </Typography>
          <Typography variant="h1" component="h1">
            The Ultimate Source for Video Game Guides
          </Typography>
          <Button variant="contained" color="primary" endIcon={<span>→</span>}>
            Try 4 Free
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
