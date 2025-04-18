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
    { id: 1, title: 'TODO1', status: 'notStarted' },
    { id: 2, title: 'TODO2', status: 'inProgress' },
    { id: 3, title: 'TODO3', status: 'done' },
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value)
  }

  // フィルター
  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo) => todo.status === 'notStarted'))
          break
        case 'inProgress':
          setFilteredTodos(todos.filter((todo) => todo.status === 'inProgress'))
          break
        case 'done':
          setFilteredTodos(todos.filter((todo) => todo.status === 'done'))
          break
        default:
          setFilteredTodos(todos)
      }
    }
    filteringTodos()
  }, [filter, todos])

  return (
    <div className="App">
      <h1>TODOアプリ</h1>

      {/* フィルター */}
      <div>
        <label htmlFor="filter">ステータスフィルター:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">すべて</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
      </div>

      {/* 追加フォーム / 編集フォーム */}
      {!isEditable ? (
        <div>
          <input
            type="text"
            placeholder="TODOを入力"
            value={todoTitle}
            onChange={handleSetTodoTitle}
          />
          <button onClick={handleAddTodo}>追加</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="新しいタイトル"
            value={newTitle}
            onChange={handleSetNewTitle}
          />
          <button onClick={handleEditTodo}>保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      )}

      {/* TODOリスト */}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo.id, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
