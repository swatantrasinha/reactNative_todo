import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ToDoType = {
  id: number;
  title: string;
  isDone: boolean;
};

const onMenuPress = () => {
  console.log("onMenuPress");
};

const TodoItem = ({
  todo,
  onDelete,
  updateTaskStatus,
}: {
  todo: ToDoType;
  onDelete: (id: number) => void;
  updateTaskStatus: (id: number) => void;
}) => (
  <View style={styles.todoContainer}>
    <View style={styles.todoInfoContainer}>
      <Checkbox
        value={todo.isDone}
        color={todo.isDone ? "#4630EB" : undefined}
        onValueChange={() => updateTaskStatus(todo.id)}
      />
      <Text
        style={[
          styles.todoText,
          todo.isDone && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
    </View>
    <TouchableOpacity onPress={() => onDelete(todo.id)}>
      <Ionicons name="trash" size={24} color={"red"} />
    </TouchableOpacity>
  </View>
);

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 01",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 02",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 03",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 04",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 05",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 06",
      isDone: false,
    },
  ];

  const [todos, setTodos] = useState<ToDoType[]>([]);
  const [todoText, setTodoText] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<ToDoType[]>([]);

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const todoList = await AsyncStorage.getItem("toDo-tasks-list");
        if (todoList !== null) {
          setTodos(JSON.parse(todoList));
          setOldTodos(JSON.parse(todoList));
        }
      } catch (err) {
        console.log("getTodoList --> err : ", err);
      }
    };

    getTodoList();
  }, []);

  useEffect(() => {
    console.log("inside useEffect for searchQuery: ", searchQuery);

    onSearch(searchQuery);
  }, [searchQuery]);

  const addNewItem = async () => {
    console.log("item added ");
    try {
      const newTodo = {
        id: Math.random(),
        title: todoText,
        isDone: false,
      };
      todos.push(newTodo);
      // const newArr = [...todos, newTodo];
      setTodos(todos);
      setOldTodos(todos);
      await AsyncStorage.setItem("toDo-tasks-list", JSON.stringify(todos));
      setTodoText("");
      Keyboard.dismiss();
    } catch (error) {
      console.log("addNewItem -->  error : ", error);
    }
  };

  const onDelete = async (itemId: number) => {
    console.log("deleted : ", itemId);
    try {
      const updatedTodos = todos.filter((item) => item.id !== itemId);
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem(
        "toDo-tasks-list",
        JSON.stringify(updatedTodos),
      );
    } catch (error) {
      console.log("onDelete --> error : ", error);
    }
  };

  const updateTaskStatus = async (id: number) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      setTodos(updatedTodos);
      await AsyncStorage.setItem(
        "toDo-tasks-list",
        JSON.stringify(updatedTodos),
      );
    } catch (error) {
      console.log("updateTaskStatus --> error : ", error);
    }
  };

  const onSearch = (query: string) => {
    console.log("onSearch for : ", query);
    if (!query) {
      console.log("inside if !query : ", query);
      setTodos(oldTodos);
    } else {
      const filteredData = todos?.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      console.log("inside onSearch filteredData : ", filteredData);
      setTodos(filteredData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onMenuPress()}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onMenuPress()}>
          <Image
            source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color={"#333"} />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={styles.searchInput}
          clearButtonMode="always"
          autoCorrect={false}
        />
      </View>
      <FlatList
        data={todos?.length ? [...todos]?.reverse() : []}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onDelete={onDelete}
            updateTaskStatus={updateTaskStatus}
          />
        )}
      />

      <KeyboardAvoidingView
        style={styles.footer}
        behavior="padding"
        keyboardVerticalOffset={10}
      >
        <TextInput
          placeholder="Add New ToDo"
          value={todoText}
          style={styles.newTodoInput}
          onChangeText={(newText) => setTodoText(newText)}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addNewItem()}>
          <Ionicons name="add" size={34} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    // paddingHorizontal: 16,
    padding: 16,
    // paddingVertical: Platform.OS === 'ios' ? 16 : 8,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  todoText: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#fff",
    // padding: 16,
    // borderRadius: 10,
  },
  newTodoInput: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4630EB",
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});
