import { useEffect, useState, useRef } from 'react';
import './App.css';
import ChatMessages from './components/chatMessage';
import ChatMessagesSkeleton from './components/chatMessageSkeleton';
import GameSlot from './components/GameSlot';
import GameSlotSkeleton from './components/GameSlotSkeleton';
import Logo from './components/logo';
import MoneyAnimation from './components/MoneyAnimations';
import ProgressTabs from './components/ProgressTabs';
import axios from 'axios';

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [dataMessages, setDataMessages] = useState(null);
    const [errorMessages, setErrorMessages] = useState(null)

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;
    
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, [dataMessages]);
    
    useEffect(() => {
      fetchDataSlots();
      fetchDataMessages();

      setMessage({
        ...message,
        messageDate: formattedDate
      });

    }, []);

    const fetchDataSlots = () => {
      setIsLoading(true);
      axios.get('http://localhost:8080/api/v1/slots/getSlots', 
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
          },
        }
      )
        .then(response => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    };  

    const fetchDataMessages = () => {
      setIsLoadingMessages(true);
      axios.get('http://localhost:8080/api/v1/messages/getMessages', 
        {
          headers: {
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
          },
        }
      )
        .then(response => {
          setDataMessages(response.data);
          setIsLoadingMessages(false);
        })
        .catch(error => {
          setErrorMessages(error);
          setIsLoadingMessages(false);
        });
    };  

    const [message, setMessage] = useState({
      description: '',
      messageDate: ''
    });

    const handleChange = (e) => {
      setMessage({
          ...message,
          [e.target.name]: e.target.value
      });
    };

    const handleSubmit = () => {
      setMessage({
          ...message,
          messageDate: formattedDate
      });


    if (!message.description || !message.messageDate) {
      console.log(message.messageDate);
      return; 
    }
    
    axios.post('http://localhost:8080/api/v1/messages/saveMessage', message)
        .then(response => {
            setMessage({...message, description: ''})
            setDataMessages(prevData => {
          return prevData ? [...prevData, response.data] : [response.data];
        });
    });
  };

  return (
    <div className="main__container">
        <div className="overlay"></div>

        <div className="resolution__warning">
            <p>The screen resolution of your device does not match this software product.</p>
        </div>

        <div className="main__content__website">

            <div className="logo__with__header__container">
                <div className="logo__container">
                    <div className="lights"></div>
                    <Logo/>
                </div>
    
                <div className="header__container">
                    <div className="main__controls">
                        <div className="deposit">
                            <div className="money__icon">
                                <div className="img__container">
                                    <i className="fa-solid fa-dollar-sign"></i>
                                </div>
                            </div>
                            <div className="deposit__controls">
                                <div className="money__counter" id="moneyCounter">
                                  <MoneyAnimation target="moneyCounter" start={0} end={10300205} duration={100} />
                                </div>
                                <div className="deposit__button">
                                    <div className="button">
                                        <i className="fa-solid fa-coins"></i>
                                        Deposit
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div className="personal__profile">
                            <div className="profile__images">
                                <div className="overlay__profile__images">
        
                                </div>
                                <div className="image">
                                    <img src="img/profile.jpg"/>
                                </div>
                            </div>
                            <div className="profile__information">
                                <div className="name__option">
                                    <div className="name">
                                        <b>Maxim Kozlov</b>
                                    </div>
                                    <div className="option">
                                        <i className="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div className="loyalty">
                                    <b>3</b> level - Loyalty Program
                                </div>
                                <ProgressTabs/>
                            </div>
                        </div>
                    </div>
                    <div className="output__left">
                        <i className="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <div className="output__right">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className="responsible__container">
                    <div className="chat__with__left__menu__responsible">
                        <div className="button__responsible">
                            <div className="button" style={{ width: "100%" }}>
                                Chat
                            </div>
                        </div>
                        <div className="button__responsible">
                            <div className="button" style={{ width: "100%" }}>
                                Menu
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div className="left__menu__with__control__container">
                <div className="left__menu">
                    <div className="menu__items">
                        <div className="slider__left__menu menu__item_container">
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round">
                                    <div className="slider__item">
                                        <i className="fa-solid fa-hand-holding-dollar"></i>
                                    </div>
                                    <div className="slider__item">
                                        <i className="fa-regular fa-clipboard" style={{color: "#475e7e"}}></i>
                                    </div>
                                </span>
                            </label>
                        </div>
        
                        <div className="menu__item__wrap__active menu__item_container">
                            <div className="menu__item__active">
                                <i className="fa-solid fa-file green"></i>
                            </div>
                        </div>
        
                        <div className="menu__item__wrap green menu__item_container">
                            <div className="menu__item">
                                <i className="fa-solid fa-bell"></i>
                            </div>
                        </div>
        
                        <div className="menu__item__wrap green menu__item_container">
                            <div className="menu__item">
                                <i className="fa-solid fa-gift"></i>
                            </div>
                        </div>
        
                        <div className="plash__item__left menu__item_container">
                        </div>
        
                        <div className="menu__item__wrap blue menu__item_container">
                            <div className="menu__item">
                                <i className="fa-solid fa-paper-plane"></i>
                            </div>
                        </div>
        
                        <div className="menu__item__wrap blue menu__item_container">
                            <div className="menu__item">
                                <i className="fa-solid fa-gamepad"></i>
                            </div>
                        </div>
        
                        <div className="social__networks menu__item_container">
                            <div className="social__item">
                                <i className="fa-brands fa-twitter"></i>
                            </div>
                            <div className="social__item">
                                <i className="fa-brands fa-facebook-f"></i>
                            </div>
                        </div>
        
                        <div className="menu__information menu__item_container">
                            <p>AML/KYC Policy</p>
                            <p>Responsible</p>
                            <p>Gambling</p>
                            <p>Coockies Policy</p>
                        </div>
                    </div>
                </div>
                
                <div className="control__container">
                    <div className="slots__container">
                        <div className="slot__image">
                            <div className="main__slot__title">
                                <h1>TOP GAME<br/>OF THE DAY!</h1>
                            </div>
                            <div className="popular__slot">
                                <div className="play__button">
                                    <i className="fa-solid fa-play"></i>
                                </div>
                                <div className="popular__slot__image">
                                    <img src="img/slot4_11zon.png"/>
                                </div>
                                <div className="popular__slot__information">
                                    <div className="popular__slot__title">
                                        Gates<br/>Olympus
                                    </div>
                                    <div className="popular__slot__description">
                                        Play Game
                                    </div>
                                </div>
                            </div>
                            <img src="img/main_image.png" alt=""/>
                        </div>
                        <div className="games">
                            <div className="games__list">
                                <div className="arrow">
                                    <div className="arrow__background">
                                        <i className="fa-solid fa-angle-left"></i>
                                    </div>
                                </div>
                                <div className="game__list__items">
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-gamepad" style={{ color: "#ffd80e" }}></i> All games</p>
                                        <div className="plash__item"></div>
                                    </div>
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-dice"></i> Popular</p>
                                        <div className="plash__item__hover"></div>
                                    </div>
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-chess-board"></i> Casino</p>
                                        <div className="plash__item__hover"></div>
                                    </div>
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-puzzle-piece"></i> Slots</p>
                                        <div className="plash__item__hover"></div>
                                    </div>
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-dice-three"></i> Turbo</p>
                                        <div className="plash__item__hover"></div>
                                    </div>
                                    <div className="game__item">
                                        <p><i className="fa-solid fa-book-skull"></i> Crash</p>
                                        <div className="plash__item__hover"></div>
                                    </div>
                                </div>
                                <div className="arrow">
                                    <div className="arrow__background">
                                        <i className="fa-solid fa-angle-right"></i>
                                    </div>
                                </div>
                            </div>
                            <input placeholder="Search game ..." className="search__games"/>
                        </div>
        
                        <div className="slots">
                              
                            {isLoading ? (
                              Array(10).fill(0).map((_, index) => <GameSlotSkeleton key={index}/>)
                            ) : (
                              data && data.map((slot) => (
                                <GameSlot image = {slot.image} title={slot.title} key={slot.id}/>
                              ))  
                            )}

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="chat__container">
            <div className="chat__top">
                <div className="chat__top__container">
                    <label className="switch__chat">
                        <input type="checkbox"/>
                        <span className="slider__chat round">
                            <div className="slider__item__chat">
                                <p>Chat</p>
                            </div>
                            <div className="slider__item__chat">
                                <p style= {{ color: "#47566D;"}}> Tournaments</p>
                            </div>
                        </span>
                    </label>
                </div>
            </div>
            <div className="chat__middle" ref={containerRef}>      
                {isLoadingMessages ? (
                  Array(10).fill(0).map((_, index) => <ChatMessagesSkeleton key={index}/>)
                ) : (
                  dataMessages && dataMessages.map((message) => (
                    <ChatMessages time={message.messageDate.split(' ')[1].slice(0, 5)} description={message.description} key={message.id}/>
                  ))  
                )}  
            </div>

            <div className="chat__bottom">
                <div className="chat__input__container">
                    <input type="text" name="description" value={message.description} onChange={handleChange} placeholder="Send a message ..."/>
                    <div className="chat__sticker__button"><i className="fa-regular fa-face-smile"></i></div>
                    <button onClick={handleSubmit}>
                        <p><i className="fa-regular fa-paper-plane"></i> Send</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
