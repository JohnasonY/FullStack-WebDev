import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if(props.feedbackCount === 0 )
    return (
      <>
        <h1>{props.header}</h1>
        <div>No feedback given</div>
      </>
  )
  return (
    <>
      <h1>{props.header}</h1>
      <table>
        <StatisticLine text={props.feedback1} value={props.feedback1Count}/>
        <StatisticLine text={props.feedback2} value={props.feedback2Count}/>
        <StatisticLine text={props.feedback3} value={props.feedback3Count}/>
        <StatisticLine text={props.allFeedbacks} value={props.feedbackCount}/>
        <StatisticLine text={props.average} value={props.averageValue}/>
        <StatisticLine text={props.positive} value={props.positivePercent + '%'}/>
      </table>
    </>
  )
} 


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const clickGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }

  const clickNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const clickBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }
  
  return (
    <div>
      <Header text={"give feedback"}/>

      <Button onClick={clickGood} text={"Good"}/>
      <Button onClick={clickNeutral} text={"Neutral"}/>
      <Button onClick={clickBad} text={"Bad"}/>

      <Statistics 
      header={"Statistics"} 
      feedback1={"good"} feedback1Count={good} 
      feedback2={"neutral"} feedback2Count={neutral}
      feedback3={"bad"} feedback3Count={bad}
      allFeedbacks={"all"} feedbackCount={all}
      average={"average"} averageValue={all === 0 ? 0 : (good-bad)/all}
      positive={"positive"} positivePercent={good === 0 ? 0 : (good / all) * 100}
      />
    </div>
  )
}

export default App