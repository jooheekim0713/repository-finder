import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Cards.css';

const Cards = ({ repos }) => {
  //PAGINATION이 안되기때문에 임시로 SLICE(0,10)
  return (
    <ul>
      {repos.slice(0, 10).map((repo) => (
        <li key={repo.id}>
          {repo.full_name}
          <button>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Cards;
