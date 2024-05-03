import React, { useEffect } from 'react';

function MoneyAnimation({ target, start, end, duration }) {
    useEffect(() => {
        const animateMoney = (target, start, end, duration) => {
            const element = document.getElementById(target);
            const range = end - start;
            const increment = range > 0 ? 1 : -1;
            const stepValue = Math.abs(Math.ceil(range / duration));
            let current = start;

            const timer = setInterval(function () {
                current += increment * stepValue;
                element.innerHTML = current.toLocaleString();

                if ((increment === 1 && current >= end) || (increment === -1 && current <= end)) {
                    clearInterval(timer);
                    element.innerHTML = end.toLocaleString();
                }
            }, 10);

            if (duration < 10) {
                element.innerHTML = end.toLocaleString();
            }
        };

        animateMoney(target, start, end, duration);
    }, [target, start, end, duration]);

    return null;
}

export default MoneyAnimation;
