import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/configureStore";
import { Provider } from "react-redux";
import Main from "./components/MainComponent";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main></Main>
      </BrowserRouter>
    </Provider>
  );
}
export default App;
