import { Octokit } from '@octokit/core';
import { useEffect, useState } from 'react';
import './List.css';
import Cards from './Cards';

function List() {
  const searchKey = 'name';
  const [value, setValue] = useState('');
  const [repos, setRepos] = useState([]);

  const onChange = (event) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };
  useEffect(() => {
    const fetchRepos = async () => {
      const octokit = new Octokit({
        auth: `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`,
      });
      const response = await octokit.request(
        `GET /search/repositories?q=${value}in:${searchKey}`
      );
      const data = response.data.items;
      setRepos(data);
    };
    fetchRepos();
  }, [value]);

  return (
    <div className="content-wrapper">
      <div className="content-box">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="repository 명을 입력해주세요"
        />
        <div className="content">
          <Cards repos={repos} />
        </div>
      </div>
    </div>
  );
}

export default List;
