import React, { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';

function ChatMessagesSkeleton() {
    useEffect(() => {
        const messages = document.querySelectorAll('.chat__message__container');
        let delay = 0;
        messages.forEach(message => {
            setTimeout(() => {
                message.classList.add('animate-message');
            }, delay);
            delay += 130;
        });
    }, []);

    return (
        <div className="chat__message__container">
            <div className="profile__images" style={{ width: "50px", height: "50px", marginRight: "10px" }}>
                <div className="overlay__profile__images" style={{ width: "40px", height: "40px" }}>

                </div>
                <div className="image">
                    <Skeleton/>
                </div>
            </div>
            <div className="chat__message__content__container">
                <div className="message__info">
                    <p className="message__name__skeleton"><Skeleton/></p>    
                </div>
                <div className="message__content">
                    <p><Skeleton count={2}/></p>
                </div>
            </div>
            <div className="chat__message__settings">
                <i className="fa-solid fa-ellipsis"></i>
            </div>
        </div>  
    );
}

export default ChatMessagesSkeleton;
