import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_ROOM = gql`
  query Room($roomId: ID!) {
    room(id: $roomId) {
      floor
      for_stuff
      id
      name
    }
  }
`;

function RoomShow() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { roomId: id }, 
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error: ${error.message}`;
  }

  const { floor, for_stuff, name } = data.room;

  return (
    <div className='show-card'>
      <p className="room-name">Room: {name}</p>
      <p className="room-details">Floor: {floor}</p>
      <p className="room-details">For Stuff: {for_stuff ? 'Yes' : 'No'}</p>
      <p className="room-details">ID: {id}</p>
    </div>
  );
}

export default RoomShow;
