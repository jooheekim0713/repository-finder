import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { itemState, repoState, urlState } from '../../atom';
import Cards from './Cards';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

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
  text-align: center;
  height: 8vh;
  font-size: 32px;
`;

const Button = styled.button`
  font-size: 32px;
  background-color: transparent;
  border-right: 5px;
  border: none;
  float: right;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 15px;
`;

const CartBox = styled.div`
  position: relative;
`;

const CartNumBox = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
  height: 20px;
  width: 20px;
  font-size: 15px;
  border-radius: 20px;
  color: white;
  background-color: transparent;
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
  const item = useRecoilValue(itemState);

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
        <Header>Repository finder</Header>
        <Link to={`/cart`}>
          <Button>
            <CartBox>
              <CartNumBox>{item.length}</CartNumBox>
              <FontAwesomeIcon icon={faCartShopping} />
            </CartBox>
          </Button>
        </Link>
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
