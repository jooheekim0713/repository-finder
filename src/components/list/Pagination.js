import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchRepos } from '../../api';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { repoState, urlState } from '../../atom';

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

const Pagination = ({ repos }) => {
  const setRepos = useSetRecoilState(repoState);
  const [urls, setUrls] = useRecoilState(urlState);

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

  //urls 버튼 first prev next last 순서로 보이도록 하기
  const renderPage = (ele) => {
    const url = ele.url;
    const queries = url.split('q=')[1];
    const values = queries.split('+')[0];
    const pageNum = queries.split('page=')[1].split('&')[0];
    fetchRepos(values, pageNum) //
      .then((response) => setRepos(response));
  };

  return (
    <PageBtnWrapper>
      {urls.map((ele) => (
        <PageBtn key={ele.title} onClick={() => renderPage(ele)}>
          {ele.title}
        </PageBtn>
      ))}
    </PageBtnWrapper>
  );
};

export default Pagination;
