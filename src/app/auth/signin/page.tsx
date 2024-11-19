"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  content: string;
}

export default function Home() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");
  
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((error) => console.error("Failed to fetch posts:", error));
  }, []);

  const handlePost = async () => {
    if (newPost.trim()) {
      try {
        await axios.post("/api/posts", { content: newPost });
        setNewPost("");
        const res = await axios.get("/api/posts");
        setPosts(res.data);
      } catch (error) {
        console.error("Error posting the content:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
Logged in
      {session ? (
        <>
          <p>Welcome, {session.user?.name || session.user?.email}</p>
          <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 mt-2">
            Sign Out
          </button>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Write a post..."
            className="w-full border rounded p-2 mt-4"
          />
          <button onClick={handlePost} className="bg-blue-500 text-white px-4 py-2 mt-2">
            Post
          </button>
          <div className="mt-6">
            {posts.map((post) => (
              <div key={post.id} className="border-b p-2">
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Please log in</p>
          <button onClick={() => signIn('google')} className="bg-blue-500 text-white px-4 py-2 mt-2">
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
