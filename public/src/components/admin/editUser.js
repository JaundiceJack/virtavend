// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch action
import { editUser } from '../../actions/userActions.js';
// Import components
import TextEntry from '../inputs/textEntry.js';
import RadioEntry from '../inputs/radioEntry.js';
import Spinner from '../multipurpose/spinner.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import { Button, Modal } from '@mantine/core';

const EditUser = ({ opened, setOpened, selectedUser }) => {
  const [name, setName] = useState(selectedUser && selectedUser.name);
  const [email, setEmail] = useState(selectedUser && selectedUser.email);
  const [isAdmin, setIsAdmin] = useState(selectedUser && selectedUser.isAdmin.toString());
  const dispatch = useDispatch();

  useEffect(() => {
    setName(selectedUser && selectedUser.name);
    setEmail(selectedUser && selectedUser.email);
    setIsAdmin(selectedUser && selectedUser.isAdmin.toString());
  }, [selectedUser])

  const { error, user, loading } = useSelector(state => state.userEdit);

  const editHandler = e => {
    e.preventDefault();
    dispatch(editUser({ _id: selectedUser._id, name, email, isAdmin }));
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Editing ${name}...`}
    >
      {
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        <form onSubmit={editHandler} className="flex flex-col">
          <TextEntry
            name="name"
            value={name}
            label="Name:"
            labelColor="#111"
            onChange={e => setName(e.target.value)} />
          <TextEntry
            type="email"
            name="email"
            value={email}
            label="Email:"
            labelColor="#111"
            onChange={e => setEmail(e.target.value)} />
          <RadioEntry
            label="Status:"
            labelColor="#111"
            value={isAdmin}
            name="isAdmin"
            options={[{label: "Admin", value: 'true'}, {label: "User", value: 'false'}]}
            onChange={e => setIsAdmin(e)}
          />

          <div className="mt-6 flex justify-evenly">
            <Button type="submit" color="green" >
              Apply
            </Button>
            <Button color="red" onClick={
              () => setOpened(false)}>
              Cancel
            </Button>
          </div>
        </form>
      }
    </Modal>
  )
}

export default EditUser;
