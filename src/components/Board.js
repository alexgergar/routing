import React, {useCallback} from "react";
import styled from "styled-components";
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {updateUser} from '../actions/user-actions'

const Board = (props) => {
  // const user = useSelector(state => state.user) // state => and then what selector to return the objec you need - use one selector for each state you need or will rerender for any change of state o
  const {user, products} = useSelector(state => ({ // use this if you want to combine your selectors , will make a shallow compare to see if state changed
    user: state.user,
    products: state.products.name
  }, shallowEqual))
  
  const dispatch = useDispatch();
  return (
    <ContainerForBoard>
      <button onClick={() => dispatch(updateUser('sammy'))}>update user</button>
      <p>{user}</p>
      <p>{products}</p>
    </ContainerForBoard>
  );
};

const ContainerForBoard = styled.div`
  min-width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  z-index: 0;
`;


export default Board;