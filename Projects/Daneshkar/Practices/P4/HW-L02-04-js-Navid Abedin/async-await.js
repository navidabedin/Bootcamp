async function fetchUserData() {

  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();
  const names = users.map(user => user.name);

  return names;
}

fetchUserData().then(names => console.log(names));
