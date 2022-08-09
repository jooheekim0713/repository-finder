import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cards from './Cards';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Container = styled.div``;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 15px;
`;

function List() {
  const searchKey = 'name';
  const searchRange = 'public';
  const pageNum = 2;
  const perPage = 10;
  const [value, setValue] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  //value
  useEffect(() => {
    const fetchRepos = async () => {
      const octokit = new Octokit({
        auth: '',
      });
      const response = await octokit.request(
        `GET /search/repositories?q=${value}in:${searchKey}is:${searchRange}&page=${pageNum}&per_page=${perPage}`
      );

      //결과값이 존재하지 않을때 처리 필요
      setRepos(response);
      setLoading(false);
    };

    fetchRepos();
  }, [value]);

  return (
    <Wrapper>
      <Container>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="repository 명을 입력해주세요"
        />
        {loading ? <h3>loading...</h3> : <Cards repos={repos} />}
      </Container>
    </Wrapper>
  );
}

export default List;
