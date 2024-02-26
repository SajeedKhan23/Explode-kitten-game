import React, { useState } from "react";
import { useSelector } from "react-redux";

function Leaderboard() {
  const users = useSelector((state) => state.leaderBoard?.userScores);
  const myUserName = useSelector((state) => state.gameState?.userName);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDeleteUser = (userName) => {
    console.log("Deleting user:", userName);
  };

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => {
              const { userName, userScore } = user;
              return (
                <tr
                  key={userName}
                  className={`leaderboard-row ${
                    myUserName === userName ? "highlighted" : ""
                  }`}
                  onClick={() => setSelectedUser(userName)}
                >
                  <td>{index + 1}</td>
                  <td>{userName}</td>
                  <td>{userScore}</td>
                  <td>
                    {selectedUser === userName && (
                      <button onClick={() => handleDeleteUser(userName)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
