type Props = {
  params: {
    username: string;
  };    
};

export default async function UserPage({ params }: Props) {
  // await params, если это промис (обычно не обязательно, но Next может попросить)
  const resolvedParams = await params;

  return (
    <div className="p-10 text-xl">
      Профиль пользователя: {resolvedParams.username}
    </div>
  );
}