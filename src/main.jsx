
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


import { CartProvider } from "./context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import { AuthProvider } from "./context/AuthContext.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(

// <QueryClientProvider client={queryClient}>
//     <CartProvider>
// <AuthProvider>
//   <App />
// </AuthProvider>
//         <ScrollToTop
//           color="white"
//           smooth
//           style={{
//             backgroundColor: "#fa2d37",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         />
//         <ToastContainer
//           position="bottom-right"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="light"
//         />

//     </CartProvider>
//   </QueryClientProvider>
  // </StrictMode>,
);
