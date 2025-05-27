import { Stack } from "react-bootstrap";
import "./Settings.scss";
import { useAppSelector } from "../../../store";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/user-redux";

const Settings: React.FC = () => {
  const userRedux = useAppSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [user, setUser] = useState(userRedux);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (userRedux) {
      setUser(userRedux);
    }
  }, [userRedux]);

  const handleOnChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleOnChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (username !== user?.username || email !== user?.email)
      setIsChanged(true);
    else setIsChanged(false);
  }, [username, email]);

  if (!user) return null;

  const handleOnUpdateUser = async () => {
    if (isChanged && username && email) {
      const response = await fetch("http://localhost:5000/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          id: user._id,
          data: {
            username,
            email,
          },
        }),
      });

      if (!response.ok) {
        throw new Response("Error while updating User.", {
          status: 500,
        });
      }

      localStorage.setItem("user_username", username);
      dispatch(userActions.updateUsername(username));
      dispatch(userActions.updateEmail(email));
    }

    return;
  };

  return (
    <Stack gap={4} className="settings">
      <Stack direction="horizontal" className="settings__heading">
        <Stack>
          <h2>Personal Info</h2>
          <p>Update your personal details</p>
        </Stack>
        <button
          type="button"
          disabled={!isChanged}
          onClick={handleOnUpdateUser}
        >
          Save
        </button>
      </Stack>
      <hr />
      <Stack gap={3} className="settings__rows">
        <Stack direction="horizontal">
          <p>Your photo</p>
          <Stack direction="horizontal" className="control">
            <div className="dashboard__header-icon avatar">
              <img src="/images/avatar/avatar_1.png" alt="user's avatar" />
            </div>
            <p>JPG or PNG 1MB max</p>
          </Stack>
        </Stack>
        <Stack direction="horizontal">
          <p>Username</p>
          <div className="control">
            <hr />
            <input
              type="text"
              onChange={(e) => handleOnChangeUsername(e)}
              value={username}
            />
          </div>
        </Stack>
        <Stack direction="horizontal">
          <p>Email</p>
          <div className="control">
            <hr />
            <input
              type="email"
              onChange={(e) => handleOnChangeEmail(e)}
              value={email}
            />
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Settings;
