import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const GitHubIssuerForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
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
        setBody("");
        setSent(true);
        console.log(res);
        console.log(res.data);
      });
  };

  return (
    <div className="wrapper">
      {loggedIn ? (
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
          <button onClick={handleSubmit}>{sent ? "Post Again to GitHub" : "Post to GitHub"}</button>  
          <a href="https://github.com/annikel/github-issuer/issues">View Issues</a>     
        </>
      ) : (
        <a href="/.auth/login/aad">Login with Azure Active Directory</a>
      )}
    </div>
  );
};

export default GitHubIssuerForm;