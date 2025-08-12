import React from 'react';
import './Home.scss';

const Home = () => {
  return (
    <div className="financial-course">
      <div className="course-image">
        {/* Placeholder for the course image */}
        <div className="image-placeholder"></div>
      </div>
      
      <div className="course-content">
        <div className="course-category">
          Иммерсионный курс: Финансовые системы
        </div>
        
        <h1 className="course-title">
          Обзор финансовой системы Казахстана
        </h1>
        
        <div className="course-goal">
          <h3 className="goal-title">Цель</h3>
          <p className="goal-description">
            Познакомить вас с основами финансовой системы Казахстана: её структурами, 
            участниками и принципами работы. Понять, как деньги движутся в экономике страны: 
            от банков до госбюджета, от налогов до инвестиций.
          </p>
        </div>
        
        <button className="start-button">
          <span>Начать</span>
          <div className="arrow-icon"></div>
        </button>
      </div>
      
      <div className="sidebar">
        <div className="national-bank">
          <div className="bank-logo"></div>
          <p className="bank-text">
            Курс разработан при поддержке Нацбанка.
          </p>
        </div>
        
        <div className="orleu-center">
          <div className="orleu-logo"></div>
          <p className="orleu-text">
            Курс разработан при поддержке АО «Национальный центр повышения 
            квалификации «Өрлеу».
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;