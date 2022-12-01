import Link from "next/link";

export default function BlogPost ({title, author, coverPhoto, datePublished, slug}) {
    return (
        <div className="m-4 flex flex-wrap max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
            <Link href={"/posts/" + slug}>
                <div className="w-full p-1 md:p-2">
                    <img className="block object-cover object-center w-full h-full rounded-lg" src={coverPhoto.url} alt="Cover Photo" /> 
                </div>
            </Link>
            <div className="p-5">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                
                <div className="flex justify-center items-center mt-6 space-x-3">
                    <img className="w-6 h-6 rounded-full" src={author.avatar.url} alt="avatar" />
                    <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                        <cite className="pr-3 font-medium text-gray-900 dark:text-white">{author.name}</cite>
                        <cite className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">{datePublished}</cite>
                    </div>
                </div>
            </div>
        </div>);
}