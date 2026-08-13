import { createBrowserRouter , RouterProvider } from "react-router-dom";
import HomePage from "./HomePage";
import FormPage from "./FormPage";
const router = createBrowserRouter([
    {path: '/',element:<HomePage></HomePage>},
    {path: 'form', element:<FormPage></FormPage>}
]);
function App(){

    return(
        <RouterProvider router={router}/>
    )
}
export default App;