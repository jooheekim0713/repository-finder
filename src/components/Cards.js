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
  const [items, setItems] = useState([]);
  const data = repos.data.items;

  useEffect(() => {
    if (data.length !== 0) {
      setCards(data);
    }
  }, [data]);

  const addItem = (card) => {
    const repoOwner = card.owner.login;
    const repoName = card.name;
    const itemObj = {
      owner: repoOwner,
      name: repoName,
    };
    validItems(itemObj, repoOwner, repoName) //
      .then(localStorage.setItem('items', JSON.stringify(items)));
  };

  const validItems = async (itemObj, repoOwner, repoName) => {
    const validItem = items.map(
      (ele) => repoOwner === ele.owner && repoName === ele.name
    );
    if (items.length < 4) {
      if (validItem.includes(true)) {
        alert('기존에 등록된 repository입니다.');
        return;
      } else {
        setItems((current) => [...current, itemObj]);
      }
    } else {
      alert(
        '저장할 수 있는 repo 개수를 초과했습니다.\n(저장할 수 있는 repo 개수는 4개 입니다.)'
      );
      return;
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <Message>NO RESULT</Message>
      ) : (
        <List>
          {cards.map((card) => (
            <ListItem key={card.id}>
              {card.full_name}
              <Button onClick={() => addItem(card)}>
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
