import Head from "next/head";
import React, { useCallback, useState } from "react";
import { Todo } from "@/types/todo";
import AddTodoForm from "@/components/AddTodoForm"
import TodoList from "@/components/TodoList";
import Banner from "@/components/Banner";
import sampleData from "@/sampleData.json";

/*
 * Home: renders the To Do list page. Which is essentially a form component for creating To Dos and 3 todo lists
 * Each TodoList renders TodoItem components for each todo passed in
 * The 3 lists are for urgent, non-urgent, and completed
 * 
 * There are also several utility functions
 * 
 * AddTodo - create a new To Do
 * deleteTodo - delete a To Do via supplied id
 * toggleProperty - toggles isCompleted or isUrgent for supplied id
 * displayTodoList - renders the TodoList component
 * displayTodos - calls displayTodoList with a filtered To Do selection
 * displayComplete - calls displayTodoList with a filtered To Do selection
 */

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(sampleData);

  const AddTodo = (title: string, desc: string) => {
    const newTodo: Todo = {
      id: todos.length + 1,
      title: title,
      description: desc,
      isCompleted: false,
      isUrgent: false,
    };
    
    setTodos([...todos, newTodo]);
    // todos.push(newTodo);
    // setTodos(todos);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    // setTodos(todos.filter((todo) => todo.id === id));
  };

  const toggleProperty = (id: number, property: keyof Pick<Todo, 'isCompleted' | 'isUrgent'>) => {
  //const toggleProperty = useCallback((id: number, property: keyof Pick<Todo, 'isCompleted' | 'isUrgent'>) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo[property] = !todo[property] as boolean;
      }
      return todo;
    });
    setTodos(updatedTodos);
  // }, [setTodos]);
  };

  const displayTodoList = (todoList:Todo[]) => {
    return (
      <TodoList
        todos={todoList}
        deleteTodo={deleteTodo} 
        toggleComplete={(id) => toggleProperty(id, 'isCompleted')} 
        toggleUrgent={(id) => toggleProperty(id, 'isUrgent')} 
      />
    );
  };

  const displayTodos = (displayUrgent: boolean) => {
    return displayTodoList(todos.filter((x) => {
      if (displayUrgent) {
        return !x.isCompleted && x.isUrgent === displayUrgent;
      } else {
        return !x.isCompleted && !x.isUrgent !== displayUrgent;
        // return !x.isCompleted && x.isUrgent !== displayUrgent;
      }
    }));
  };

  const displayComplete = () => {
    return displayTodoList(todos.filter((x) => x.isCompleted));
  };

  return (
    <>
      <Head>
        <title>To Do List</title>
        <meta name="description" content="To Do List App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="Home">
        
        <AddTodoForm addTodo={AddTodo}/>
        {displayTodos(true)}
        {displayTodos(false)}
        {displayComplete()}
      </div>
    </>
  );
}
