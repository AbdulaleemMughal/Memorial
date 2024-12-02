import { useSelector } from 'react-redux';
import styles from '../LivePageCss/favourite.module.scss';
import { RootState } from '../../Store/appstore';
import { LiaQuoteLeftSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';
import { FavouriteInterface } from '../../Typescript/favourite';

export const Favourite = () => {

    const [favourite, setFavourite] = useState<FavouriteInterface[]>([]);
    const [inputValue, setInputValue] = useState<string>("");


    const textColor = useSelector((store: RootState) => store.text.isText);
    const pageColor = useSelector((store: RootState) => store.color.isColor);
    const favouriteSwitch = useSelector((store: RootState) => store.favourite.isFavouriteSwitch);


    useEffect(() => {
        setInputValue(localStorage.getItem('favourite-input') || '');

        const storedFavourite = localStorage.getItem('favourite');
        if (storedFavourite) {
            setFavourite(JSON.parse(storedFavourite));
        }
    }, []);


    return (
        <>
            {favouriteSwitch && <div className={styles['favourite']}>
                <div className={styles['favourite-heading']} style={{color: textColor}}>
                    <h2>Favourite</h2>
                    <div className={styles['favourite-heading-line']} style={{backgroundColor: pageColor}}></div>
                </div>
                <div className={styles['favourite-content']}>
                    {
                        favourite.map((f) => (
                            <div className={styles['favourite-content-card']} key={f.id}>
                        <h6 style={{color: textColor}}><LiaQuoteLeftSolid /> {f.name}</h6>
                        <p style={{color: textColor}}>{f.desc}</p>
                    </div>
                        ))
                    }
                    
                </div>
            </div>}
        </>
    );
};