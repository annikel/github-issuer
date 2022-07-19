import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const GitHubIssuerForm = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [sent, setSent] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await fetch("/.auth/me");
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    };
    fetchCurrentUser()
      .then((response) => {
        if (response !== null && response !== undefined) {
          setLoggedIn(true);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = () => {
    const issue = {
      title: title,
      body: body,
    };
    axios
      .post("/api/repos/annikel/github-issuer/issues", issue)
      .then((res) => {
        setTitle("");
        setBody("");
        setSent(true);
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="wrapper">
      {true ? (
        <>
          <input
            placeholder="Title"
            type="text"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />
          <input
            placeholder="Description"
            type="text"
            name="description"
            onChange={(event) => setBody(event.target.value)}
          />
          <button onClick={handleSubmit}>{sent ? "Post Again" : "Post to GitHub"}</button>       
        </>
      ) : (
        <a href="/.auth/login/aad">Login to GitHub</a>
      )}
    </div>
  );
};

export default GitHubIssuerForm;