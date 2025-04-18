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

  const handleSetTodoTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value)
  }

  const resetTodoTitle = () => {
    setTodoTitle('')
  }

  const handleAddTodo = () => {
    if (!todoTitle.trim()) return // 空白のTODOは追加しない

    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }])
    setTodoId(todoId + 1)
    resetTodoTitle()
  }

  const handleDeleteTodo = (targetId: number) => {
    setTodos(todos.filter((todo) => todo.id !== targetId))

    // 編集中のTODOが削除された場合、編集モードを閉じる
    if (editId === targetId) {
      handleCloseEditForm()
    }
  }

  const handleSetNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const handleOpenEditForm = (todo: Todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId(undefined)
    setNewTitle('')
  }

  const handleEditTodo = () => {
    if (!newTitle.trim() || editId === undefined) return

    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, title: newTitle } : todo
      )
    )
    handleCloseEditForm()
  }

  const handleStatusChange = (
    todoId: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const status = e.target.value as 'notStarted' | 'inProgress' | 'done'
    setTodos(
      todos.map((todo) => (todo.id === todoId ? { ...todo, status } : todo))
    )
  }

  return <div className="App">{/* ここにUI */}</div>
}

export default App
