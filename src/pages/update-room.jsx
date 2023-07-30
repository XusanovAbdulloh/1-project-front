import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";

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

const UPDATE_ROOM = gql`
  mutation UpdateRoom($updateRoomId: ID!, $input: UpdateRoomInput!) {
    updateRoom(id: $updateRoomId, input: $input) {
      name
      floor
      for_stuff
    }
  }
`;

function UpdateRoom() {
  const { id } = useParams();
  const navigate = useHistory();
  const [update, setUpdate] = useState({});
  const { called, loading, error, data } = useLazyQuery(GET_ROOM, { variables: { roomId: id } });
  const [updateRoom, { loading: mutationLoading, error: mutationError }] = useMutation(UPDATE_ROOM);

  useEffect(() => {
    if (data && data.room) {
      setUpdate(data.room);
    }
  }, [data]);

  if ((loading && called) || mutationLoading) {
    return <div>Loading...</div>;
  }

  if (error || mutationError) {
    return <div>Error: {error ? error.message : mutationError.message}</div>;
  }

//   const handleChange = (e) => {
//     const { name,floor,for_stuff } = e.target;
//     setUpdate((prevUpdate) => ({
//       ...prevUpdate,
//       [name]: update.name,
//       [floor]: update.floor,
//       [for_stuff]: update.for_stuff,
//     }));
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    if (!update.name || update.floor === undefined || update.for_stuff === undefined) {
      console.error("Error updating room: Please fill in all required fields");
      return;
    }
    const floor = parseInt(update.floor);
    const forStuff = update.for_stuff === "true";
  
    console.log("Update data:", {
      name: update.name,
      floor,
      for_stuff: forStuff,
    });
  
    updateRoom({
      variables: { updateRoomId: id, input: { ...update, floor, for_stuff: forStuff } },
    })
      .then(({ data }) => {
        navigate.push(`/`);
        return <h1>Updatet</h1>
      })
      .catch((error) => {
        console.error("Error updating room:", error);
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={update.name}
          onChange={(e) => setUpdate({...update,name: e.target.value })}
        />
      </label>
      <label>
        Floor:
        <input
          type="number"
          placeholder="1, 2, 3"
          name="floor"
          value={update.floor}
          onChange={(e)=> setUpdate({...update,floor: parseInt(e.target.value)})}
        />
      </label>
      <label>
        For Stuff:
        <input
    type="checkbox"
    name="for_stuff"
    checked={update.for_stuff === true}
    onChange={(e) => setUpdate({ ...update, for_stuff: e.target.checked ? true : false })}
  />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateRoom;