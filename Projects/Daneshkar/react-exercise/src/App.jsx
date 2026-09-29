import './App.css';
import ProductList from './part1-products/ProductList';
import InputToConsole from './part2-input/InputToConsole';
import UserList from './part3-users/UserList';

function App() {
  // آرایه کاربران در کامپوننت پدر (App) است و با props به UserList پاس داده میشود
  const users = [
    { id: 1, name: 'Ali Rezaei', age: 24, city: 'Tabriz' },
    { id: 2, name: 'Navid Abedin', age: 27, city: 'Tehran' },
    { id: 3, name: 'Yaser Karimi', age: 19, city: 'Shiraz' },
  ];

  return (
    <div className="app">
      <h1>React Three Questions</h1>

      <section className="section">
        <h2>1 - Items List</h2>
        <ProductList />
      </section>

      <section className="section">
        <h2>2 - Show Input typed into console</h2>
        <InputToConsole />
      </section>

      <section className="section users-section">
        <h2>3 - UsersList</h2>
        <UserList users={users} />
      </section>
    </div>
  );
}

export default App;
