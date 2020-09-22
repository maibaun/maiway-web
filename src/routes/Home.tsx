import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { dbSvc } from "../fBase";
import { rootState } from "../store";
import { loginProps } from "../store/loginReducer";

interface HomeProps {
  userObj: loginProps;
}
interface NweetProps {
  text: string;
  id: string;
}
const Home = ({ userObj }: HomeProps) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState<NweetProps[]>([]);

  // const getNweets = async () => {
  //   const dbNweets = await dbSvc.collection("nweets").get();
  //   dbNweets.forEach((document) => {
  //     const nweetObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setNweets((prev: any) => [nweetObject, ...prev]);
  //   });
  // };

  // useEffect(() => {
  //   getNweets();
  // }, []);

  useEffect(() => {
    dbSvc.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dbSvc.collection("nweets").add({ text: nweet, createAt: Date.now() });
    setNweet("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
