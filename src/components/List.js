import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchRepos } from '../api';
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

const PageBtnWrapper = styled.div`
  display: inline-block;
`;

const PageBtn = styled.button`
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  border: none;
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`;

function List() {
  const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
  const searchKey = 'name';
  const searchRange = 'public';
  const pageNum = 1;
  const perPage = 10;
  const [value, setValue] = useState('');
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState([]);

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

  useEffect(() => {
    if (repos.headers?.link) {
      const link = repos.headers.link;
      const links = link.split(',');
      setUrls(
        links.map((ele) => {
          return {
            url: ele.split(';')[0].replace('<', '').replace('>', ''),
            title: ele
              .split(';')[1]
              .replace('rel="', '')
              .replace('"', '')
              .trim(),
          };
        })
      );
    }
  }, [repos.headers?.link]);

  const renderPage = (ele) => {
    const url = ele.url;
    const queries = url.split('q=')[1];
    const values = queries.split('+')[0];
    const pageNum = queries.split('page=')[1].split('&')[0];
    fetchRepos(values, pageNum) //
      .then((response) => setRepos(response));
  };

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
            <PageBtnWrapper>
              {urls.map((ele) => (
                <PageBtn key={ele.title} onClick={() => renderPage(ele)}>
                  {ele.title}
                </PageBtn>
              ))}
            </PageBtnWrapper>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default List;
