import React, { useEffect } from 'react';

function ProgressTabs() {
    useEffect(() => {
        const progressTabs = document.querySelectorAll('.progress__tab');
        progressTabs.forEach((tab, index) => {
            if (index < 3) {
                tab.style.animationDelay = `${index * 0.3}s`;
                tab.classList.add("yellow");
            }
        });
    }, []);

    return (
        <div className="progress__bar">
            <div className="progress__tab"></div>
            <div className="progress__tab"></div>
            <div className="progress__tab"></div>
            <div className="progress__tab"></div>
            <div className="progress__tab"></div>
            <div className="progress__tab"></div>
        </div>
    );
}

export default ProgressTabs;