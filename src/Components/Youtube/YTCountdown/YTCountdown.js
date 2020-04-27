import React from 'react';
import QuizYT from '../QuizYT/QuizYT';


function YTCountdown(props) {
    const [seconds, setSeconds] = React.useState(5);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(props.toNext());
        }
    });

    return (
        <div className="YTCountdown">
            <h3>
                Next question in:
                {seconds}
            </h3>
        </div>
    );
}

export default YTCountdown;
