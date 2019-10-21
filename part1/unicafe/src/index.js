import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ value, text }) => (
  <>
    <td>{text}</td>
    <td>
      {value} {text === 'positive' && '%'}
    </td>
  </>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <Statistic text="good" value={good} />
          </tr>
          <tr>
            <Statistic text="neutral" value={neutral} />
          </tr>
          <tr>
            <Statistic text="bad" value={bad} />
          </tr>
          <tr>
            <Statistic text="all" value={all} />
          </tr>
          <tr>
            <Statistic text="average" value={average} />
          </tr>
          <tr>
            <Statistic text="positive" value={positive} />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setFeedback = feedback => () => {
    if (feedback === 'good') {
      setGood(good + 1)
    } else if (feedback === 'neutral') {
      setNeutral(neutral + 1)
    } else if (feedback === 'bad') {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setFeedback('good')} text="good" />
      <Button handleClick={setFeedback('neutral')} text="neutral" />
      <Button handleClick={setFeedback('bad')} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
