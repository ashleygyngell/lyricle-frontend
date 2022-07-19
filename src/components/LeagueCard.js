import React from 'react';
import { Link } from 'react-router-dom';

const LeagueCard = ({ _id, league_name, league_users }) => {
  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet">
      <Link to={`/userleagues/${_id}`}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-header-title">{league_name}</h2>
          </div>
          {/* <div className="card-image">
            <figure className="image image-is-1by1">
              <img src={image} alt={name} />
            </figure>
          </div> */}
        </div>
      </Link>
    </div>
  );
};

export default LeagueCard;
