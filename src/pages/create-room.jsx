import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const CREATE_ROOM_MUTATION = gql`
  mutation CreateRoom($input: CreateRoomInput!) {
    createRoom(input: $input) {
      name
      floor
      for_stuff
      id
    }
  }
`;

function CreateRoom() {
  const [name, setName] = useState('');
  const [floor, setFloor] = useState(0);
  const [forStuff, setForStuff] = useState('');
  const [createRoom, { loading, error }] = useMutation(CREATE_ROOM_MUTATION);
  const navigate = useHistory();

  const disabled = !name || !floor || !forStuff;

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createRoom({
            variables: { input: { name, floor, for_stuff: forStuff } },
          })
            .then(({ data }) => {
              const { id } = data.createRoom;
              navigate.push(`/rooms/${id}`);
            })
            .catch((error) => {
              console.error('Error creating room:', error.message);
            });
        }}
      >
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Floor:
          <input type="number" value={floor} onChange={(e) => setFloor(+e.target.value)} />
        </label>
        <label>
          For Stuff:
          <input type="text" value={forStuff} onChange={(e) => setForStuff((e.target.value=='true')?true:false)} />
        </label>
        <button type="submit" disabled={disabled}>
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
