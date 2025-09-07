export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
    reservasGym: [],
    reservasPacking: [],
    reservasBBQ: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "addReservaGym":
      return action.payload
        ? { ...store, reservasGym: [...store.reservasGym, action.payload] }
        : store;

    case "addReservaPacking":
      return action.payload
        ? { ...store, reservasPacking: [...store.reservasPacking, action.payload] }
        : store;

    case "addReservaBBQ":
      return action.payload
        ? { ...store, reservasBBQ: [...store.reservasBBQ, action.payload] }
        : store;

    default:
      return store; // 👈 mejor que lanzar un error
  }
}