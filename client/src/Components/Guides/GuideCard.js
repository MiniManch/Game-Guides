import { Link } from 'react-router-dom';
import css from './Style/GuideCard.module.css'; // Import the CSS file for styling
const GuideCard = ({ guide }) => {
  return (
    <div className={css.guide_card}>
        <img src={guide.picture} alt={guide.name} className={css.guide_image} />
        <p className={css.guide_instructor}>Instructor: {guide.instructor}</p>
        <Link  to={`/guides/preview/${guide.name}`} className={css.preview_button}>
          Watch a Preview!
        </Link>
    </div>
  );
};

export default GuideCard;
