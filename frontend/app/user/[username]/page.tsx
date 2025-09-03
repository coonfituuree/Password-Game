type Props = {
  params: {
    username: string;
  };    
};

export default function UserPage({ params }: Props) {
  return (
    <div className="p-10 text-xl">
      Профиль пользователя: {params.username}
    </div>
  );
}
