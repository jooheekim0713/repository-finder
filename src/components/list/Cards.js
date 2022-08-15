import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { itemState } from '../../atom';
import { useRecoilState } from 'recoil';

const Message = styled.h3`
  color: black;
`;

const List = styled.ul`
  margin-top: 10px;
  padding: 0;
  width: 350px;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 10px 20px;
  margin: 4px 0;
  border: 1px solid black;
  border-radius: 15px;
  background-color: #fff;
  overflow: hidden;
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
  const [items, setItems] = useRecoilState(itemState);
  const data = repos.data.items;

  useEffect(() => {
    if (data.length !== 0) {
      setCards(data);
    }
  }, [data]);

  useEffect(() => {
    if (items.length === 4) {
      localStorage.setItem('repos', JSON.stringify(items));
    }
  }, [items]);

  const onClick = (card) => {
    validItem(card);
  };

  const validItem = (card) => {
    const repoOwner = card.owner.login;
    const repoName = card.name;
    const checkItem = items.map(
      (ele) => repoOwner === ele.repoOwner && repoName === ele.repoName
    );

    if (items.length < 4) {
      if (checkItem.includes(true)) {
        alert('기존에 등록된 repository 입니다.');
      } else {
        addItem(repoOwner, repoName);
      }
    } else {
      alert(
        '저장할 수 있는 repository 개수를 초과했습니다. \n저장가능한 repository 개수는 4개입니다.'
      );
    }
  };

  const addItem = (repoOwner, repoName) => {
    setItems((current) => [...current, { repoOwner, repoName }]);
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
              <Button onClick={() => onClick(card)}>
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
