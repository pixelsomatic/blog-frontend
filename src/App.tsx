import React from 'react';
import './App.css';
import { usePostQuery } from './useRequest';
import { getPosts } from './graphql';
import Card from './components/Card';

function App() {
  const { loading, error, data } = usePostQuery(getPosts);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong!</h1>;

  return (
    <div className="App">
      {data?.posts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </div>
  );
}

export default App;
