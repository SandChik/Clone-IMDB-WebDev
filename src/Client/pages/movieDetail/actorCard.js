import React from "react";
import "./actorCard.css";

const ActorCard = ({ actor }) => {
  return (
    <div className="actor-card">
      <img
        className="actor-card__img"
        src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
        alt={actor.name}
      />
      <p>{actor.name}</p>
    </div>
  );
};

export default ActorCard;
