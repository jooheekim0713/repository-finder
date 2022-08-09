import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Message = styled.h3`
  color: black;
`;

const List = styled.ul`
  margin-top: 10px;
  padding: 0;
`;
const ListItem = styled.li`
  list-style-type: none;
  padding: 10px 20px;
  margin: 4px 0;
  border: 1px solid black;
  border-radius: 15px;
  background-color: #fff;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  float: right;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Cards = ({ repos }) => {
  const [cards, setCards] = useState([]);
  let data = repos.data.items;
  useEffect(() => {
    if (data.length !== 0) {
      setCards(data);
    }
  }, [data]);

  return (
    <>
      {data.length === 0 ? (
        <Message>NO RESULT</Message>
      ) : (
        <List>
          {cards.map((card) => (
            <ListItem key={card.id}>
              {card.full_name}
              <Button>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Cards;
