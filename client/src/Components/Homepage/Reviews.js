import React from 'react';
import css from './Style/Reviews.module.css'; // Import the CSS module for styling

const Reviews = () => {
  return (
    <div className={`${css.main}`}>
            <h2 className={`${css.reviews_title}`}>Totally not fake Reviews</h2>

        <div className={`${css.reviews}`}>
            <div className={`${css.review}`}>
                <div className={`${css.review_stars}`}>★★★★★</div>
                <p className={`${css.review_text}`}>
                GG rescued me from endless virtual embarrassments.
                Now, instead of faceplanting into walls,
                I'm kicking virtual butt! Who knew a website could turn me from a noob to a ninja?
                </p>
                <p className={`${css.review_name}`}>- Joe Mama</p>
            </div>
            <div className={`${css.review}`}>
                <div className={`${css.review_stars}`}>★★★★★</div>
                <p className={`${css.review_text}`}>
                Lost in the virtual wilderness? Fear not! GameGuides.com is my gaming GPS.
                I've gone from wandering aimlessly to strutting confidently.
                Now NPCs ask for my autograph!
                </p>
                <p className={`${css.review_name}`}>- Emily Spawncamper</p>
            </div>
            <div className={`${css.review}`}>
                <div className={`${css.review_stars}`}>★★★★★</div>
                <p className={`${css.review_text}`}>
                I thought I knew it all until I met GameGuides.com. Now I'm like a walking strategy guide.
                My friends call me "Human Wiki." It's a thing.
                </p>
                <p className={`${css.review_name}`}>- Kevin Smurferson</p>
            </div>
        </div>
    </div>
  );
};

export default Reviews;
