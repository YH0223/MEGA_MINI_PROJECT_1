import React, { useState } from "react";
import "./Calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 현재 월의 첫 번째 날과 마지막 날 계산
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  // 이전 달의 마지막 날짜 계산
  const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
  
  // 현재 월의 날짜 배열 생성
  const daysArray: Date[] = [];

  // 이전 달의 마지막 며칠 표시
  for (let i = prevMonthLastDay.getDay(); i >= 0; i--) {
    daysArray.push(new Date(prevMonthLastDay.getFullYear(), prevMonthLastDay.getMonth(), prevMonthLastDay.getDate() - i));
  }

  // 현재 달 날짜 추가
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysArray.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }

  // 다음 달의 시작 날짜 추가 (빈칸 채우기)
  for (let i = 1; daysArray.length % 7 !== 0; i++) {
    daysArray.push(new Date(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth() + 1, i));
  }

  // 이전 달로 이동
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {daysInWeek.map((day, index) => (
          <div key={index} className="calendar-day-header">{day}</div>
        ))}
        {daysArray.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day.getMonth() !== currentDate.getMonth() ? "other-month" : ""}
              ${selectedDate?.toDateString() === day.toDateString() ? "selected" : ""}`}
            onClick={() => setSelectedDate(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
