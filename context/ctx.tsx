import { PropsWithChildren, createContext, useState } from "react";

// // This hook can be used to access the user info.
// export function useSession() {
//   const value = React.useContext(AuthContext);
//   if (process.env.NODE_ENV !== "production") {
//     if (!value) {
//       throw new Error("useSession must be wrapped in a <SessionProvider />");
//     }
//   }

//   return value;
// }

// export function SessionProvider(props: React.PropsWithChildren) {

//   return (
//     <AppContext.Provider
//       value={{
//         signIn: () => {
//           // Perform sign-in logic here
//           setSession("xxx");
//         },
//         signOut: () => {
//           setSession(null);
//         },
//         session,
//         isLoading,
//       }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// }

type AppContextType = {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
};

export const AppContext = createContext<AppContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// Provider component
// export const AppProvider = ({ children }: PropsWithChildren) => {
//   const [user, setUser] = useState(null);

//   // Function to update user
//   const updateUser = (userData) => {
//     setUser(userData);
//   };

//   // Function to clear user
//   const clearUser = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
