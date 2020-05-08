import React from 'react';
// import QuizYT from '../QuizYT/QuizYT';
import '../YTCountdown/YTCountdown.css'


    // PROGRESS RAINBOW BAR
    class YTCountdown extends React.Component{
    state = {
            progress: 0,
            speed: 6,
            color: "#ff08050"
          }

          componentDidMount() {
            console.clear();
            this.interval = setInterval(() => this.frame(), 1);
          }
          //works perfect for iphone6/7/8
          frame() {
            if (this.state.progress < 331){
              this.setState((prevState, props) => ({
                progress: prevState.progress + this.state.speed,
                color: "#" + this.red() + this.green() + "50"
              }));
              console.log(this.state.color);
            }
          }

          componentWillUnmount() {
            clearInterval(this.interval);
          }
          green() {
            let progress = this.state.progress;
            progress *= 2.55;
            progress = Math.round(progress);
            progress = progress.toString(16);
            return progress;
          }
          red() {
            let progress = this.state.progress;
            progress *= 2.55;
            progress = Math.round(progress);
            progress = 150 - progress;
            progress = progress.toString(16);
            return progress;
          }
        render(){
          return (
              <div id='myProgress'>
            <div id="myBar" style={{
                width: this.state.progress ,
                backgroundColor: this.state.color
              }}>
              </div>
               {/* <div id="label">Next question in {this.state.progress}</div>  */}
            </div>);
        }
      }
//       SIMPLE COUNTDOWN
//     const [seconds, setSeconds] = React.useState(5);

//     React.useEffect(() => {
//         if (seconds > 0) {
//             setTimeout(() => setSeconds(seconds - 1), 1000);
//         }
//     });

//     return (
//         <div className="YTCountdown">
//             <h5>
//                 {'Next question in '}
//                 {seconds}
//             </h5>
//         </div>
//     );
// }

export default YTCountdown;
