import { MDXRemote } from 'next-mdx-remote/rsc'


const defaultComponents = {
}

type Props = {
  mdxSource: string,
  components?: any
}
 
export function RemoteMdxPage({ mdxSource,components }:Props) {
 
  return (
    <div className={`prose max-w-none dark:text-gray-400 dark:prose-h1:text-gray-200 dark:prose-h2:text-gray-200 dark:prose-h3:text-gray-200 dark:prose-h4:text-gray-200 dark:prose-strong:text-gray-200`}>
      <MDXRemote source={mdxSource} components={{ ...defaultComponents, ...(components || {}) }}/>
    </div>
  )
}



