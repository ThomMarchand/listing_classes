import { Inter } from "next/font/google";
import { useGetAllUsersQuery } from "@/graphql/generated/schema";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useGetAllUsersQuery();

  return (
    <main className={`${inter.className}`}>
      <h1>Dashboard</h1>
      {data?.getAllUsers.map((user) => (
        <div key={user.email}>
          <p>{user.email}</p>
          <p>{user.first_name}</p>
          <p>{user.last_name}</p>
        </div>
      ))}
    </main>
  );
}
