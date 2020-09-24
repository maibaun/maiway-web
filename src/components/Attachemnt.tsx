import React, { useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { storageSvc, dbSvc } from "../fBase";
import { rootState } from "../store";
import { loginProps } from "../store/loginReducer";

interface AttachmntProps {
  userObj: loginProps;
}

const Attachmnt = ({ userObj }: AttachmntProps) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState<any>("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("aa");
    event.preventDefault();
    // if (nweet === "") {
    //   return;
    // }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageSvc
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbSvc.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
        const currentTarget = finishedEvent.currentTarget as FileReader;
        const { result } = currentTarget;
        setAttachment(result);
      };
      if (Boolean(theFile)) {
        reader.readAsDataURL(theFile);
      }
    }
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Add photos</span>
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
      />
      <input type="submit" value="upload"></input>
      {attachment && (
        <div>
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
          />
          <div onClick={onClearAttachment}>
            <span>Remove</span>
          </div>
        </div>
      )}
    </form>
  );
};

function mapStateToProps(state: rootState) {
  return { userObj: state.loginReducer };
}

export default connect(mapStateToProps)(Attachmnt);
