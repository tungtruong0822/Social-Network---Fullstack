import React from "react";
import Feed from "../components/page/Feed";
import Rightbar from "../components/page/Rightbar";
import Topbar from "../components/page/Topbar";
import Sidebar from "../components/page/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPost } from "../redux/reducers/post";

function Home() {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state);
  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={post.post} />
        <Rightbar />
      </div>
    </div>
  );
}

export default Home;
