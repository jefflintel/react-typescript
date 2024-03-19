import { type ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import fetchingImg from "./assets/data-fetching.png";
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<String>();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true);
      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts/"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    };

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (error) {
    content = <ErrorMessage text={error as string} />
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  if (isFetching) {
    content = (
      <p id="loading-fallback">
        Your posts are around here somewhere. Hold on.
      </p>
    );
  }

  return (
    <main>
      <img src={fetchingImg} alt="an image showing data fetching" />
      {content}
    </main>
  );
}

export default App;
