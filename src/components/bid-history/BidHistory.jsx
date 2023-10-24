import PropTypes from 'prop-types';

function BidHistory({ history }) {
  return (
    <div>
      <h4>Bidding History</h4>
      <ul>
        {history.map((bid, index) => (
          <li key={index}>
            {bid.username} bid {bid.amount} on {bid.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

BidHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BidHistory;
