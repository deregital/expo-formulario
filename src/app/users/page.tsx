'use client';
import { trpc } from '@/utils/trpc';
import React from 'react';

interface UserPageProps {}

const UserPage = ({}: UserPageProps) => {
  const { data } = trpc.user.getAll.useQuery();
  const addUser = trpc.user.add.useMutation();
  const trpcUtils = trpc.useUtils();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    await addUser.mutateAsync({ name, email });
    trpcUtils.user.getAll.invalidate();
  }

  return (
    <div className="p-2">
      {data?.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ))}

      <form
        onSubmit={handleSubmit}
        className="flex max-w-sm flex-col gap-4 pt-2 text-black"
      >
        <input type="text" name="name" placeholder="Nombre" />
        <input type="email" name="email" placeholder="Email" />
        <input
          type="submit"
          value="Add User"
          className="bg-red-500 px-2 py-1"
        />
      </form>
    </div>
  );
};

export default UserPage;
