import React, { useEffect } from 'react';

function GameSlot({image, title}) {
    return (
        <div className="slot__item">
            <img src={image} alt={title}/>
        </div>
    );
}

export default GameSlot;
