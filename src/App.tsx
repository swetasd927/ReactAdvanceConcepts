import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
};

function App() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users", page],

    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=3`
      );

      return res.json();
    },
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <div>
      <h1>Page {page}</h1>

      {data?.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
        </div>
      ))}

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      <button
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

    </div>
  );
}

export default App;