const GuessHistoryFeed = ({guessHistory}) => {
  return (
    <div className="guessHistory">
      {
        guessHistory.map((guessObject, i) => {
          return (
            <div className="historyContainer" key={i}>
              <p>
                Your guess: {guessObject.guess}
              </p>
              <p>
                {guessObject.feedbackMessage}
              </p>
            </div>
          )

        })
      }
    </div>
  )
}

export default GuessHistoryFeed;