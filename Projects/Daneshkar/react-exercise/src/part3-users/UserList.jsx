import { Fragment } from 'react';

// کامپوننت فرزند: آرایه کاربران را از طریق props دریافت میکند
function UserList({ users }) {
  return (
    <>
      {users.map((user) => (
        <Fragment key={user.id}>
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
          <p>City: {user.city}</p>
        </Fragment>
      ))}
    </>
  );
}

export default UserList;
