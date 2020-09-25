import React, { useState } from "react";
import { dbSvc, storageSvc } from "../fBase";
import { NweetProps } from "../routes/_Home";

interface NweetsProps {
  nweetObj: NweetProps;
  isOwner: boolean;
}
const Nweet = ({ nweetObj, isOwner }: NweetsProps) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await dbSvc.collection("nweets").doc(`${nweetObj.id}`).delete();

      nweetObj.attachmentUrl &&
        (await storageSvc.refFromURL(nweetObj.attachmentUrl).delete());
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbSvc.collection("nweets").doc(`${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
