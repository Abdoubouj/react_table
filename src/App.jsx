import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { COLUMNS } from "./columns/columns";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { FiChevronsLeft , FiChevronsRight } from "react-icons/fi";
import axios from "axios";
import SearchBox from "./components/SearchBox";
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://retoolapi.dev/8wMEUh/programs");
      setProducts(response?.data);
    };
    fetchData();
  }, []);
  const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => products, []);
  const tableInstance = useTable(
    {
      columns,
      data:products,
      initialState:{
        pageSize:10
      }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,state,setGlobalFilter ,previousPage,nextPage , canPreviousPage , canNextPage,pageCount ,gotoPage , pageOptions , selectedFlatRows} =
    tableInstance;

    const {globalFilter , pageIndex} = state;
    console.log(selectedFlatRows);

  return (
    <div className="wrapper">
      <SearchBox term={globalFilter} setTerm={setGlobalFilter}/>
      <table {...getTableProps()} aria-label="simple table">
        <thead>
          {headerGroups?.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((col, ind) => {
                return (
                  <th
                    {...col?.getHeaderProps(col?.getSortByToggleProps())}
                    key={ind}
                  >
                    {...col.render("Header")}
                    <span>
                      {col.isSorted ? (col.isSortedDesc ? <IoIosArrowDown/> : <IoIosArrowUp/>) : ""}
                    </span>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {page?.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index} {...row.getRowProps()}>
                {row?.cells.map((cell, idx) => {
                  if (cell.column["Header"] === "Thumbnail") {
                    return (
                      <td key={idx} {...cell.getCellProps()}>
                        <img width={80} src={cell["value"]} alt="#" />
                      </td>
                    );
                  }
                  return <td {...cell.getCellProps()}>{cell?.render('Cell')}</td>;
                })}
                <td><input type="checkbox" {...row.getToggleRowSelectedProps()} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {pageOptions?.length > 1 &&
        <div style={{width:"100%"}} className="d-flex px-5 justify-content-center">
          <div>
           {/* page : {pageIndex + 1}  of {pageOptions?.length} */}
          </div>
          <div className="d-flex">
          <button className="btn btn-warning" onClick={()=>gotoPage(0)} disabled={!canPreviousPage}><FiChevronsLeft/></button>
          <button className="btn btn-warning" onClick={()=>previousPage()} disabled={!canPreviousPage}>prev</button>
          <div className="d-flex">
            {pageOptions?.map((item)=>(
              <button className="btn btn-warning" onClick={()=>gotoPage(item)} disabled={pageIndex === item}>{item + 1}</button>
            ))}
          </div>
          <button className="btn btn-warning" onClick={()=>nextPage()} disabled={!canNextPage}>next</button>
          <button className="btn btn-warning" onClick={()=>gotoPage(pageCount - 1)} disabled={!canNextPage}><FiChevronsRight/></button>
          </div>
        </div>
          }
    </div>
  );
}

export default App;
