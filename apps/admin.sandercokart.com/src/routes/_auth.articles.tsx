import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/articles')({
  component: () => <div>Hello /_auth/articles!</div>
})