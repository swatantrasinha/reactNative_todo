# Welcome to your Expo app 👋

### Start with code
<details>
    <summary>Steps to start with expo</summary>
    <p>

1. give command   

> npx create-expo-app@latest

- give name of the app as **expo-crash-course**

**See the various files and folder created**

2. give reset command using bun

> bun run reset-project

- when it asks: Do you want to move existing files to /app-example instead of deleting them? (Y/n) --> Select **n**

3. now give command to install

> npm i

4. Now give below command 

> bunx expo start   

Note if there is any network related then give below command and then above command in point 4   
> EXPO_OFFLINE=1 bunx expo start

5. We will see QR code 
we can scan it and see output as below: 
<img width="369" height="800" alt="image" src="https://github.com/user-attachments/assets/885474df-f9c7-4331-b8d4-d8cdc10669b4" />


7. now in **app** folder inside **index.tsx** file, change below:   

   ~<Text>Edit app/index.tsx to edit this screen.</Text>~   
   to    
   <Text>Hello World </Text>
   
The output in mobile device will be changed to below:

<img width="369" height="800" alt="image" src="https://github.com/user-attachments/assets/3f0802c6-0906-4bee-a444-54ed32a5bffe" />

8. Now lets addd todo items array and display it   
```javascript
import { FlatList, Text, View } from "react-native";

export default function Index() {

  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Hello World </Text> */}
      <FlatList
        data={todoData}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

```
this is how it will be shown   
<img width="590" height="1280" alt="image" src="https://github.com/user-attachments/assets/37ea27b6-eeb9-47ac-a35d-f89e8fc8ba47" />


9. We can see there is header with **index** text. We don't want this so we will add prop **screenOptions** into **Stack** component in layout.tsx   

```javascript
import { Stack } from "expo-router";

export default function RootLayout() {
// return <Stack />
   return <Stack screenOptions={{ headerShown: false }} />;
}
```

With this change, the header with text **index** is removed but the main content with todo items are going out of view as below: 

<img width="369" height="800" alt="image" src="https://github.com/user-attachments/assets/f76cc984-a4ca-44b0-8880-86fa5e59e9d9" />


10. To make content appear in safe view in index.tsx change **View** to **SafeAreaView**   

```javascript
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Hello World</Text> */}
      <FlatList
        data={todoData}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

```
Below will be the outpuut   

<img width="369" height="800" alt="image" src="https://github.com/user-attachments/assets/d50e6d98-7924-410a-8af1-7f8fd5364b28" />

11. The CSS in SafeAreaView component will now be moved separately using StyleSheet from react-native   
This will not have any impact on view as its just separating the CSS code   

```javascript
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const todoData = [
    {
      id: 1,
      title: "Todo 1",
      isDone: false,
    },
    {
      id: 2,
      title: "Todo 2",
      isDone: false,
    },
    {
      id: 3,
      title: "Todo 3",
      isDone: false,
    },
    {
      id: 4,
      title: "Todo 4",
      isDone: true,
    },
    {
      id: 5,
      title: "Todo 5",
      isDone: false,
    },
    {
      id: 6,
      title: "Todo 6",
      isDone: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Hello World</Text> */}
      <FlatList
        data={todoData}
        keyExtractor={(index) => index.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

```

</p>
</details>

---   

Now we will see use of below 
- Image:  with props --> source={{ uri: <url-of-image> }} style={with witdth, height, borderRadius etc}   

- TouchableOpacity:  TouchableOpacity is a pressable wrapper component in React Native that makes any child component touch‑responsive by reducing its opacity when pressed. It’s commonly used for buttons, icons, cards, and list items.   

- Ionicons - from **@expo/vector-icons** to show icons   

- TextInput - input textbox   

- Checkbox - we will install a package for checkbox   

> npm install expo-checkbox@4.0.1


<details>
    <summary>Use of **AsyncStorage**  </summary>
    <p>
to store data in browser storage    
Link : https://docs.expo.dev/versions/latest/sdk/async-storage/
    </p>
</details>



