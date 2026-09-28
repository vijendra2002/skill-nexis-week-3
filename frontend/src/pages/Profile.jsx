import { useAuth } from "../context/AuthContext";
import ImageUpload from "../components/ImageUpload";

export default function Profile() {
  const { user, setUser } = useAuth();

  const onUploaded = (imageUrl) => {
    setUser({ ...user, avatar: imageUrl });
  };

  return (
    <main className="page narrow">
      <section className="panel">
        <p className="eyebrow">Authenticated User</p>
        <h1>{user?.name}</h1>
        <p className="muted">{user?.email}</p>
      </section>

      <ImageUpload user={user} onUploaded={onUploaded} />
    </main>
  );
}
