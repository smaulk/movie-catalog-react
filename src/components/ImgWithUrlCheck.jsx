import React, { useEffect, useState } from 'react';

const ImgWithUrlCheck = ({ src, defaultSrc, alt, ...props }) => {

    const [imageUrl, setImageUrl] = useState(defaultSrc);

    useEffect(() => {

        checkUrl();
    }, [src, defaultSrc]);

    async function checkUrl() {
        try {
            const response = await fetch(src);
            if (response.ok) {
                setImageUrl(src);
            }
        } catch (error) {
            setImageUrl(defaultSrc);
        }
    }

    return (
            <img src={imageUrl} {...props} alt={alt} />
    );
};

export default ImgWithUrlCheck;
