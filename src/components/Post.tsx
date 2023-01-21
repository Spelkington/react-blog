// Code adapted to TypeScript from https://blog.bitsrc.io/build-a-blog-with-react-and-markdown-files-30d969ce62d5

import { useState, useEffect } from "react"
import Markdown from "markdown-to-jsx"
import Code from "./Code"

import cover from '../assets/img/cover.jpeg'

interface PostProps {
    postName: string
}

const Post = (props: PostProps) => {
  const [postContent, setPostcontent] = useState('')
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    import(`../posts/${props.postName}.md`)
      .then(res =>
        fetch(res.default)
          .then(response => response.text())
          .then(response => setPostcontent(response))
          .catch(err => console.log(err))
      )
  }, [props.postName])

  return (
    <div className="posts">
      <article>
        <header>
          <div className="article__cover">
            <img
              src={cover}
              alt="my-cover"
            />
          </div>
        </header>
        <main className="post">
          <Markdown
            options={{
                overrides: {
                  code: {
                    component: Code,
                    props: {
                      isDark,
                      setIsDark
                    }
                  }
                }
              }}
          >
            {postContent}
          </Markdown>
        </main>
      </article>
    </div>
  )
}

export default Post