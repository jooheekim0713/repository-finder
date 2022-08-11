import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Octokit } from '@octokit/core';
import { fetchIssues } from '../api';
import IssuePagination from './Issue-pagination';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;
const Container = styled.div``;

const Header = styled.header`
  width: 100%;
  height: 10vh;
  font-size: 32px;
`;

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

function Issues() {
  const { state } = useLocation();
  const [cards, setCards] = useState([]);
  const repoOwner = state.owner;
  const repoName = state.name;

  useEffect(() => {
    fetchIssues(repoOwner, repoName) //
      .then((response) => setCards(response.data));
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          {repoOwner}
          {'/'}
          {repoName}
        </Header>
        {cards.length === 0 ? (
          <Message> NO ISSUE</Message>
        ) : (
          <>
            <List>
              {cards.map((card) => (
                <ListItem key={card.id}>{card.title}</ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default Issues;
