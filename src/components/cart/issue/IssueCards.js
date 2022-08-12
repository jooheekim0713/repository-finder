import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { issueState } from '../../../atom';

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

function IssueCards() {
  const issues = useRecoilValue(issueState);
  return (
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
    </>
  );
}

export default IssueCards;
