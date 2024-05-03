import React, { useEffect, useState } from 'react';

function Logo() {
    const [rotationAngle, setRotationAngle] = useState(0);

    useEffect(() => {
        const rotateImage = () => {
            setRotationAngle(prevAngle => prevAngle + 0.5);
        };
        const animationId = requestAnimationFrame(rotateImage);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [rotationAngle]);

    const imageStyle = {
        transform: `rotate(${rotationAngle}deg)`
    };

    return (
        <div className="logo">
            <img id="logo__img" src="img/logo.png" alt="" style={imageStyle} />
        </div>
    );
}

export default Logo;
