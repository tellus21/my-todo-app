import React, { useState, useEffect } from 'react'

// todoの型
type Todo = {
  id: number
  title: string
  status: 'notStarted' | 'inProgress' | 'done'
}

const App: React.FC = () => {
  // TODOリスト
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: '買い物をする', status: 'notStarted' },
    { id: 2, title: '部屋の掃除', status: 'inProgress' },
    { id: 3, title: '企画書作成', status: 'done' },
  ])

  // 新規TODO用
  const [todoTitle, setTodoTitle] = useState<string>('')
  const [todoId, setTodoId] = useState<number>(4) // 最初の3つのTODOの後からIDを振る

  // 編集用
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [newTitle, setNewTitle] = useState<string>('')

  // フィルター用
  const [filter, setFilter] = useState<string>('all')
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos)

  return <div className="App">{/* ここにUI */}</div>
}

export default App
