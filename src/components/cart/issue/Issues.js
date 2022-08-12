import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchIssues } from '../../../api';
import IssuePagination from './IssuePagination';
import { useRecoilState } from 'recoil';
import { issueState } from '../../../atom';
import IssueCards from './IssueCards';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Container = styled.div``;

const Header = styled.header`
  text-align: center;
  font-size: 32px;
  margin: 3vh 0;
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
            <IssueCards />
            <IssuePagination owner={repoOwner} name={repoName} />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default Issues;
