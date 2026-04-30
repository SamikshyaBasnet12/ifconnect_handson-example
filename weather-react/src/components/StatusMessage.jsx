import React from 'react';

function StatusMessage({ loading, error }) {
  if (loading) {
    return (
      <div className="status-message loading">
        <div className="spinner"></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        <p>⚠️ {error}</p>
      </div>
    );
  }

  return null;
}

export default StatusMessage;
