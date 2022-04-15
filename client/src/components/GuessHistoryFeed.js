const GuessHistoryFeed = ({guessHistory}) => {
  return (
    <div className="guessHistory">
      {
        guessHistory.map((guessObject) => {
          return (
            <div className="historyContainer">
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