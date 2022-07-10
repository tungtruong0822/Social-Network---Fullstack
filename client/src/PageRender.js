import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/NotFound";

const generatePage = (name) => {
  const component = () => require(`./page/${name}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const islogin = localStorage.getItem("login");

  let name = "";

  if (islogin) {
    if (!page) name = "home";
    else name = id ? `${page}/[id]` : `${page}`;
  } else {
    if (page === "register") name = "register";
    else name = "login";
  }

  name = name.charAt(0).toUpperCase() + name.slice(1);

  return generatePage(name);
};

export default PageRender;
