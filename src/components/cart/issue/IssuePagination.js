import { useState } from 'react';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchIssues } from '../../../api';
import { issueState } from '../../../atom';

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

function IssuePagination({ owner, name }) {
  const setIssues = useSetRecoilState(issueState);
  const [link, setLink] = useState([]);
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchIssues(owner, name, page) //
      .then((response) => setLink(response.headers?.link ?? []));
  }, [owner, name, page]);

  useEffect(() => {
    if (link.length > 0) {
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
  }, [link]);

  const renderPage = (ele) => {
    const url = ele.url;
    setPage(url.split('&page=')[1].split('&per_page')[0]);
  };

  useEffect(() => {
    fetchIssues(owner, name, page) //
      .then((response) => setIssues(response.data));
  }, [page]);

  return (
    <PageBtnWrapper>
      {urls.map((ele) => (
        <PageBtn key={ele.title} onClick={() => renderPage(ele)}>
          {ele.title}
        </PageBtn>
      ))}
    </PageBtnWrapper>
  );
}

export default IssuePagination;
