import React from "react";
import "./actorCard.css"; // Pastikan ada file CSS untuk styling

const ActorCard = ({ actor }) => {
  console.log(actor.urlPhoto); // Lihat URL gambar yang diterima

  return (
    <div className="actor-card">
      <div className="actor-card__image">
        <img
          src={actor.urlPhoto || "https://via.placeholder.com/150"} // Jika tidak ada URL, tampilkan placeholder
          alt={actor.name}
        />
      </div>
      <div className="actor-card__name">{actor.name}</div>
    </div>
  );
};

export default ActorCard;
