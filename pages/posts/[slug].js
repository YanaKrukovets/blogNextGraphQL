import { GraphQLClient, gql } from 'graphql-request'

const graphcms = new GraphQLClient('https://api-ca-central-1.hygraph.com/v2/clb3sa3ox01l401ue1hk2ev60/master');

const QUERY = gql`
    query Post($slug: String!) {
        post(where: {slug: $slug}) {
            id, 
            title,
            slug,
            datePublihed,
            author {
                id,
                name,
                avatar {
                    url
                }
            }
            content {
                html
            }
            coverPhoto {
                id,
                url
            }
        }
    }
`;

const SLUGLIST = gql`
{
    posts {
        slug
    }
}`;

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUGLIST);
    return {
        paths: posts.map((post) => ({ params: {slug: post.slug}})),
        fallback: false,

    }
}

export async function getStaticProps({params}) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, {slug});
  const post = data.post;

  return {
    props: {
      post
    },
    revalidate: 10
  }
}

export default function BlogPost(post) {
    console.log(post);
  return (
    <div>
      <main className="h-full bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100">
        <div className="p-5 mx-auto sm:p-10 md:p-16 dark:bg-gray-800 dark:text-gray-100">
	        <div className="flex flex-col max-w-3xl mx-auto overflow-hidden rounded">
		        <img src={post.post.coverPhoto.url} alt="Cover Photo" className="w-full h-60 sm:h-96 dark:bg-gray-500" />
		<div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-2xl sm:px-10 sm:mx-12 lg:rounded-md dark:bg-gray-900">
			<div className="space-y-2">
				<h2 className="inline-block text-2xl font-semibold sm:text-3xl">{post.post.title}</h2>
				<p className="text-xs dark:text-gray-400">By {post.post.author.name}</p>
			</div>
			<div className="dark:text-gray-100">
				<div className ="justify-self-center" dangerouslySetInnerHTML={{__html: post.post.content.html}}></div>
			</div>
		</div>
	</div>
</div>
    
      </main>

    </div>
  )
}
