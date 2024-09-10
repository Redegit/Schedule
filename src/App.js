import { Table } from "./components/table/Table";
import GlobalContextProvider from "./hoc/GlobalContextProvider";

function App() {
  return (
    <GlobalContextProvider>
      <Table />
    </GlobalContextProvider>
  );
}

export default App;
