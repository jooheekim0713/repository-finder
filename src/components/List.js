import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchRepos } from '../api';
import { repoState, urlState } from '../atom';
import Cards from './Cards';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Pagination from './Pagination';

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
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const searchKey = 'name';
  const searchRange = 'public';
  const pageNum = 1;
  const perPage = 10;
  const [value, setValue] = useState('');
  const [repos, setRepos] = useRecoilState(repoState);
  const [loading, setLoading] = useState(true);
  const setUrls = useSetRecoilState(urlState);

  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
    setUrls([]);
  };

  useEffect(() => {
    if (value.length > 0) {
      const fetchRepo = async () => {
        const octokit = new Octokit({
          auth: ACCESS_TOKEN,
        });
        const response = await octokit.request(
          `GET /search/repositories?q=${value}+in%3A${searchKey}+is%3A${searchRange}&page=${pageNum}&per_page=${perPage}`
        );
        setRepos(response);
        setLoading(false);
      };
      fetchRepo();
    }
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
        {loading ? (
          <h3>loading...</h3>
        ) : (
          <>
            <Cards repos={repos} />
            <Pagination repos={repos} />
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default List;
