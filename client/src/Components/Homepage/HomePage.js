import HomeHeader from './HomeHeader';
import Reviews from './Reviews';
import ShopAt from './ShopAt';
import PopularGuides from './PopularGuides';

const HomePage = ()=>{
    return(
        <div>
            <HomeHeader />
            <ShopAt />
            <PopularGuides />
            <Reviews />

        </div>
    )
}

export default HomePage;