
    async function fetchTodos() {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!response.ok) throw new Error(`خطای شبکه: ${response.status}`);
      return response.json();
    }

    function filterCompleted(todos) {
      return todos.filter(todo => todo.completed === true);
    }

    function formatTitle(prefix) {
      return function(todo) {
        return `${prefix} ${todo.title}`;
      };
    }

    function renderTodos(todos) {
      const list   = document.getElementById("list");
      const status = document.getElementById("status");
      const format = formatTitle("✔");

      status.textContent = `${todos.length} کار انجام‌شده پیدا شد`;

      todos.forEach(todo => {
        const li    = document.createElement("li");
        const badge = document.createElement("span");
        badge.className   = "badge";
        badge.textContent = `#${todo.id}`;

        const text = document.createTextNode(format(todo));

        li.appendChild(badge);
        li.appendChild(text);
        list.appendChild(li);
      });
    }

    async function main() {
      try {
        const todos     = await fetchTodos();
        const completed = filterCompleted(todos);
        renderTodos(completed);
      } catch (err) {
        document.getElementById("status").innerHTML =
          `<span class="error">⚠ ${err.message}</span>`;
      }
    }

    main();