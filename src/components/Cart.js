import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ItemState } from '../atom';

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
  height: 10vh;
  font-size: 32px;
`;

const Message = styled.h3`
  color: black;
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
  const [carts, setCarts] = useState(JSON.parse(localStorage.getItem('repos')));
  const [items, setItems] = useRecoilState(ItemState);

  const onClick = (cart) => {
    console.log('clicked', cart);
  };
  return (
    <Wrapper>
      <Container>
        <Header>Repository cart</Header>
        <List>
          {carts.map((cart, index) => (
            <ListItem key={index}>
              {cart.repoOwner}
              {'/'}
              {cart.repoName}
              <Button onClick={() => onClick(cart)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
}

export default Cart;
