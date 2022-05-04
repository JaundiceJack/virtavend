import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../actions/userActions.js';
import { Button, Modal } from '@mantine/core';

const DeleteUser = ({ opened, setOpened, selectedUser }) => {
  const dispatch = useDispatch();
  const userDelete = useSelector(state => state.userDelete);
  const { error, message, loading } = userDelete;

  const deleteHandler = () => {
    dispatch(deleteUser(selectedUser._id));
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Are you sure you want to remove ${selectedUser && selectedUser.name}?`}
    >
      <div className="flex justify-evenly">
        <Button color="red" onClick={
          () => {
            deleteHandler();
            setOpened(false);
          }}>
          Yes
        </Button>
        <Button onClick={
          () => setOpened(false)}>
          No
        </Button>
      </div>
    </Modal>
  )
}

export default DeleteUser;
