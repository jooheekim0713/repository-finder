import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIssues } from '../api';
import IssuePagination from './IssuePagination';
import { useRecoilState } from 'recoil';
import { issueState } from '../atom';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Container = styled.div``;

const Header = styled.header`
  width: 100%;
  height: 10vh;
  font-size: 48px;
`;

const Message = styled.h3`
  color: gray;
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
  a {
    text-decoration: none;
    color: black;
  }
`;

const Card = styled.div``;

const UserProfile = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  margin-bottom: 16px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  margin-right: 12px;
`;

const UserName = styled.h1`
  margin-bottom: 0;
  font-size: 16px;
`;

function Issues() {
  const { state } = useLocation();
  const [issues, setIssues] = useRecoilState(issueState);
  const repoOwner = state.owner;
  const repoName = state.name;

  useEffect(() => {
    fetchIssues(repoOwner, repoName) //
      .then((response) => setIssues(response.data));
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          {repoOwner}
          {'/'}
          {repoName}
        </Header>
        {issues.length === 0 ? (
          <>repository에 issue가 존재하지 않습니다.</>
        ) : (
          <>
            <Message>카드 선택시 해당 Github 이슈 창이 뜹니다.</Message>
            <List>
              {issues.map((card) => (
                <ListItem key={card.id}>
                  <a href={card.html_url}>
                    <Card>
                      <UserProfile>
                        <UserImg src={card.user.avatar_url} />
                        <div>
                          <UserName>{card.user.login}</UserName>
                          <span>{card.created_at}</span>
                        </div>
                      </UserProfile>
                      {card.title}
                    </Card>
                  </a>
                </ListItem>
              ))}
            </List>
            <IssuePagination owner={repoOwner} name={repoName} />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default Issues;
