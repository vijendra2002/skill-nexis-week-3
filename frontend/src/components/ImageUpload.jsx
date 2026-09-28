import { useEffect, useState } from "react";
import api from "../api";

const API_ORIGIN = "http://localhost:5000";

export default function ImageUpload({ user, onUploaded }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const upload = async (event) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await api.post("/uploads/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage("Image uploaded successfully.");
      setFile(null);
      onUploaded(data.imageUrl);
    } catch (error) {
      setMessage(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const current = user?.avatar ? `${API_ORIGIN}${user.avatar}` : "";

  return (
    <section className="panel">
      <p className="eyebrow">Multer Upload</p>
      <h2>Profile Image</h2>

      <div className="avatar-preview">
        {preview || current ? (
          <img src={preview || current} alt="Profile preview" />
        ) : (
          <span>No image</span>
        )}
      </div>

      <form onSubmit={upload}>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setFile(event.target.files?.[0] || null)}
        />
        <button className="button primary" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {message && <p className="helper">{message}</p>}
    </section>
  );
}
