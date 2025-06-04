const GeoLocation = ({ getLocation, position, isLoading }) => {
  return (
    <div className="geo-location">
      <button
        onClick={getLocation}
        disabled={isLoading}
        className="location-button"
      >
        {isLoading ? "Localisation..." : "Obtenir ma position"}
      </button>
    </div>
  );
};

export default GeoLocation;