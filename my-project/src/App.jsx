import './App.css'
import { useState } from 'react'

function App() {
  const [score, setScore] = useState(0)

  return (
    <main className="scoreboard-page">
      <section className="scoreboard" aria-labelledby="scoreboard-title">
        <header className="scoreboard-header">
          <span className="live-indicator">LIVE MATCH</span>
          <p className="innings-label">FIRST INNINGS</p>
          <h1 id="scoreboard-title">CRICKET SCOREBOARD</h1>
        </header>

        <div className="score-panel" aria-live="polite">
          <p className="team-label">YOUR TEAM</p>
          <p className="score-value">{score}</p>
          <p className="score-caption">RUNS</p>
        </div>

        <div className="score-controls" aria-label="Add runs">
          <button
            className="run-button four-button"
            onClick={() => setScore((currentScore) => currentScore + 4)}
          >
            <span className="run-value">+4</span>
            <span className="run-label">FOUR</span>
          </button>
          <button
            className="run-button six-button"
            onClick={() => setScore((currentScore) => currentScore + 6)}
          >
            <span className="run-value">+6</span>
            <span className="run-label">SIX</span>
          </button>
        </div>

        <button className="reset-button" onClick={() => setScore(0)}>
          Reset score
        </button>
      </section>
    </main>
  )
}

export default App;