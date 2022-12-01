import Head from 'next/head'
import { GraphQLClient, gql } from 'graphql-request'
import BlogCard from '../components/BlogCard.js';

const graphcms = new GraphQLClient('https://api-ca-central-1.hygraph.com/v2/clb3sa3ox01l401ue1hk2ev60/master');

const QUERY = gql`
{
  posts {
    id
    coverPhoto {
      url
    }
    author {
      avatar {
        url
      }
      name
    }
    slug
    title
    datePublihed
  }
}`;

export async function getStaticProps() {
  const {posts} = await graphcms.request(QUERY);

  return {
    props: {
      posts
    },
    revalidate: 10
  }
}

export default function Home(posts) {
  return (
    <div>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        
        <section className="overflow-hidden text-gray-700 dark:bg-gray-800 ">
          <div className="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
          <h1 className="text-center m-3 text-[3rem] font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Web development Blog</h1>
            <div className="flex flex-wrap -m-1 md:-m-2 justify-center items-center">
              
            {posts.posts.map((post) => (
                <BlogCard 
                    title={post.title}
                    author={post.author}
                    coverPhoto={post.coverPhoto}
                    key={post.id}
                    datePublished={post.datePublihed}
                    slug={post.slug}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
