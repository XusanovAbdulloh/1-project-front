import { gql, useQuery, useMutation } from "@apollo/client";
import React from "react";


const GET_ROOMS = gql`
  query Query($input: QueryRoomsInput) {
    rooms (input: $input) {
      list {
        id
        name
        floor
      }
      limit
      offset
      total
    }
  }
`;
const REMOVE_ROOM = gql`
  mutation Mutation($removeRoomId: ID!) {
  removeRoom(id: $removeRoomId) {
    floor
    for_stuff
    id
    name
  }
}
`

function Listrooms() {
  const { loading, error, data, refetch } = useQuery(GET_ROOMS, {
    "input": {
      "page": {
        "limit": 10,
        "offset": 0
      }
    }
  });

  const [removeRoom, { loading: loading1, error: error1 }] = useMutation(REMOVE_ROOM);

  if (loading || loading1) {
    return 'Loading...';
  }

  if (error || error1) {
    return `Error: ${error ? error.message : error1.message}`;
  }

  return (
    <>
    <Link to="/rooms/create">Create Room</Link>
      <div className="container">
        {data?.rooms.list.map((rooms) => (
          <div className="cards" key={rooms.id}>
            <p>{rooms.id}</p>
            <h2>{rooms.name},   {rooms.floor}-qavat</h2>
            <div className="cards-btns">
            <button className="show-btn-room">
              <a href={`/rooms/${rooms.id}`}>Show room</a>
            </button>
              <button className="edit-btn-room">
                <a href={`/rooms/edit/${rooms.id}`}>Edit room</a>
              </button>
              <button className="remove-room-btn" onClick={() =>
                removeRoom({
                  variables: { "removeRoomId": rooms.id },
                }).then(refetch)
              }>
                Remove Room
              </button>
            </div>
          </div>
        ))}
      </div>
      </>
  
  );
}

export default Listrooms;
