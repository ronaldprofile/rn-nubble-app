import { TextMessage } from '@components'
import { usePostCommentCreate } from '@domain'
import { useState } from 'react'
import { Keyboard } from 'react-native'

interface PostCommentTextMessageProps {
  postId: number
}

export function PostCommentTextMessage({
  postId
}: PostCommentTextMessageProps) {
  const { createComment } = usePostCommentCreate(postId, {
    onSuccess: () => {
      Keyboard.dismiss()
      setMessage('')
    }
  })

  const [message, setMessage] = useState('')

  return (
    <TextMessage
      value={message}
      onChangeText={setMessage}
      onPressSend={createComment}
      placeholder='Adicione um comentário'
    />
  )
}
