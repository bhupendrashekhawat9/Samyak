
import { Dialog } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { BiSolidCalendar } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';


const methods = {
  getDaysInMonth: (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  },
  getDay: (year: number, month: number, day: number) => {
    return new Date(year, month, day).getDay();
  },
  createCalendar: (year: number, month: number) => {
    // debugger
    const days = methods.getDaysInMonth(year, month);
    const calendar: number[][] = [[]];
    const monthStartDate = moment(new Date(year, month,0)).startOf("month");
    const weekStartDay = monthStartDate.startOf("week")

    const startOffset = moment(weekStartDay).diff(monthStartDate,"days");

    let currentWeek: number[] = Array(startOffset).fill(0); // fill initial blanks

    for (let date = 0; date <= days; date++) {
      if (currentWeek.length === 7) {
        calendar.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(date);
    }

    if (currentWeek.length) {
      while (currentWeek.length < 7) currentWeek.push(0); // trailing blanks
      calendar.push(currentWeek);
    }

    return calendar;
  }
};
interface Props {
    onClick:(dateObj:{startDate:Date,endDate:Date})=>void,
    value:{
        startDate:Date;
        endDate:Date
    },
    span:number
}

const Calendar = ({onClick,value:inputVal,span}:Props) => {
let value = inputVal??{startDate:new Date(),endDate:new Date()}
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth()+1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const calendar = methods.createCalendar(selectedYear, selectedMonth);
  const weekDays = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = (week: number[]) => {
    if(span != 7){
      return;
    }
    let filteredDates = week.filter((i)=> i!=0);
    let startDate = filteredDates[0];
    let endDate = filteredDates[filteredDates.length-1]
    onClick({
        startDate: new Date(selectedYear,selectedMonth,startDate),
        endDate:new Date(selectedYear,selectedMonth,endDate)
    })
  };

  const handleToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const goToPreviousMonth = () => {
    setSelectedMonth(prev => {
      if (prev === 0) {
        setSelectedYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setSelectedMonth(prev => {
      if (prev === 11) {
        setSelectedYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    );
  };

  return (
    <div  className='relative inline-block text-black' >
      <div onClick={handleToggle} className='p-0.5 cursor-pointer'>
        <SlCalender className='text-black bg-amber-50 text-xs' style={{
          fontSize:''
        }} />
      </div>
      
        <Dialog open={open} onClose={handleToggle}>

        <div 
        
        className=' mt-2 p-4 min-w-[280px] bg-white rounded-lg shadow-lg z-50'>
          <div className='flex justify-between items-center mb-2'>
            <button onClick={goToPreviousMonth} className='text-sm'>◀</button>
            <span className='font-semibold'>
              {new Date(selectedYear, selectedMonth).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <button onClick={goToNextMonth} className='text-sm'>▶</button>
          </div>
          <div className='grid grid-cols-7 gap-1 text-center font-medium border-b pb-1 border-orange-300'>
            {weekDays.map((day) => (
              <div key={day} className='text-sm text-gray-700'>{day}</div>
            ))}
          </div>
          {calendar.map((week, idx) => (
            <div onClick={()=>handleDayClick(week)} key={idx} className={`grid grid-cols-7 gap-1 my-1 ${span == 7 && "hover:bg-amber-100 hover:font-bold"}`}>
              {week.map((day, i) => {
                let isDateHighLighted = (day)=>{
                   if( new Date(value.startDate) <= new Date(selectedYear,selectedMonth,day) && new Date(value.endDate) >= new Date(selectedYear,selectedMonth,day) ){
                    return true
                   }
                }
                return <div
                  key={`${idx}-${i}`}
                 
                  className={`p-2 text-sm rounded cursor-pointer text-center 
                    ${isDateHighLighted(day)?"bg-amber-400":""}
                    ${day === 0 ? 'text-gray-300' : ''}
                    ${isToday(day) ? 'bg-orange-300 text-white font-bold' : 'hover:bg-amber-100'}`}
                >
                  {day !== 0 ? day : ''}
                </div>
})}
            </div>
          ))}
        </div>
        </Dialog>

    
    </div>
  );
};

export default Calendar;
