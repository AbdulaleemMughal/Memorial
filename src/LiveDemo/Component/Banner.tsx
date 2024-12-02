import { useEffect, useState } from 'react';
import styles from '../LivePageCss/banner.module.scss'

export const Banner = () => {

    const [image, setImage] = useState<string | null>('');

    useEffect(() => {
        setImage(localStorage.getItem('banner-image') || null);
    }, [])

    return (
        <>
            <div className={styles['banner']} style={{
          backgroundImage: image ? `url(${image})` : "none",}}>
            </div>
        </>
    );
};