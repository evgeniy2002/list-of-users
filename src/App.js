import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState } from 'react';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvite] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch(' https://reqres.in/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const addInviteUser = (id) => {
    if (invites.includes(id)) {
      setInvite((prev) => prev.filter((_id) => _id != id));
    } else {
      setInvite((prev) => [...prev, id]);
    }
  };
  const onClickSentUser = () => {
    if (invites.length > 0) {
      setSuccess(true);
    }
  };
  // const onClickSentUser = () => {
  //   setSuccess(true);
  // };
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          onChangeSearchValue={onChangeSearchValue}
          addInviteUser={addInviteUser}
          invites={invites}
          onClickSentUser={onClickSentUser}
        />
      )}
    </div>
  );
}

export default App;
