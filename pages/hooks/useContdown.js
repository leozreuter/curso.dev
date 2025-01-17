import { useState } from "react";

export default function useContdown (date) {

    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [second, setSecond] = useState();

    
    const contdown = () => {
        const countDate = new Date(date).getTime();
        const now = new Date().getTime();


        const interval = countDate-now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const dayNumber = Math.floor(interval / day);
        const hourNumber = Math.floor((interval % day) / hour);
        const minuteNumber = Math.floor((interval % hour) / minute);
        const secondNumber = Math.floor((interval % minute) / second);

        setDay(dayNumber)
        setHour(hourNumber)
        setMinute(minuteNumber)
        setSecond(secondNumber)
    }

    setInterval(contdown, 1000)

    return [day, hour, minute, second]
}