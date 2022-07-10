import React from "react";

function Icon({ contentChat, setContentChat }) {
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];

  return (
    <div className="nav-item dropdown">
      <span
        className="nav-link position-relative px-1"
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span style={{ fontSize: "25px", cursor: "pointer" }}>😄</span>
      </span>

      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <div className="reactions">
          {reactions.map((icon) => (
            <span
              style={{ cursor: "pointer" }}
              key={icon}
              onClick={() => setContentChat(contentChat + icon)}
            >
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Icon;
