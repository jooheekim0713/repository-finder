import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { itemState } from '../../atom';
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
  height: 8vh;
  text-align: center;
  font-size: 32px;
`;

const Message = styled.h3`
  color: black;
`;

const List = styled.ul`
  width: 25vw;
  margin-top: 10px;
  padding: 0;
  width: 300px;
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

const Button = styled.button`
  background-color: transparent;
  border: none;
  float: right;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
`;

function Cart() {
  const [items, setItems] = useRecoilState(itemState);

  const onClick = (index) => {
    const itemsArr = [...items];
    itemsArr.splice(index, 1);
    setItems(itemsArr);
  };
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(items));
  }, [items]);

  return (
    <Wrapper>
      <Container>
        <Header>Repository cart</Header>
        <>
          {items.length === 0 ? (
            <Message>저장된 repository가 없습니다.</Message>
          ) : (
            <List>
              {items.map((cart, index) => (
                <ListItem key={index}>
                  <Link
                    to={`/cart/${cart.repoOwner}/${cart.repoName}`}
                    state={{ owner: cart.repoOwner, name: cart.repoName }}
                  >
                    {cart.repoOwner}
                    {'/'}
                    {cart.repoName}
                  </Link>
                  <Button onClick={() => onClick(index)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </ListItem>
              ))}
            </List>
          )}
        </>
      </Container>
    </Wrapper>
  );
}

export default Cart;
