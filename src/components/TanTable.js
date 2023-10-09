import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel, //for pagination 
    getSortedRowModel,// for sorting inside table
    getFilteredRowModel, //for filtering column
} from "@tanstack/react-table";
import React,{useState} from "react";
const TanTable = ({ details, handleSort }) => {
const [sorting, setSorting] = useState([])
const [filtering, setFiltering] = useState('')
 
    const columns = [
        {
            header: 'ID',// column heading
            accessorKey: 'id'// value to be rendered in column
        },
        {
            header: 'NAME',
            accessorKey: 'name'
        },
        {
            header: 'AGE',
            accessorKey: 'age'
        },
        {
            header: 'DEPARTMENT',
            accessorKey: 'department'
        },
        {
            header: 'SALARY',
            accessorKey: 'salary'
        }
    ]
    const data = details
    console.log(details)
    const table1 = useReactTable({
        data: data || [],// either use the data or empty array while api fetch
        columns,
        getCoreRowModel: getCoreRowModel(),//for using row property
        getPaginationRowModel: getPaginationRowModel(),//adding pagination functionality
        getSortedRowModel: getSortedRowModel(),//adding sorting functionality
        getFilteredRowModel:getFilteredRowModel(),//for filtering 
        state:{
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })

    return (
        <>
            <div>
            <input class="form-control me-2 my-2 " value={filtering} onChange={(e) =>setFiltering(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                <table className="table table-striped mt-1">
                    <thead>
                        {table1.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}  onClick={() => handleSort(header.column)}>
                                        {/* renders table  */}
                                        {flexRender(header.column.columnDef.header, header.getContext())}

                                    {/* for sorting the column data */}
                                        {
                                            { asc: ' 🔽', desc:' 🔼'}[
                                                header.column.getIsSorted() ?? null
                                            ]
                                        }
                                        
                                    </th>
                                ))}
                              
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table1.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {/* renders table data */}
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>
                {/* pagination using inbuild functions of tanstack  */}
                <div className=" container">
                    <div className=" row">
                        <div className=" d-flex justify-content-between">
                            <button type="button" className="btn btn-primary" onClick={() => table1.setPageIndex(0)}>First page</button>
                            <button  type="button" disabled ={!table1.getCanPreviousPage()} className="btn btn-warning"  onClick={() => table1.previousPage()}>Previous</button>
                            <button type="button"   disabled ={!table1.getCanNextPage()}className="btn btn-warning" onClick={() => table1.nextPage()}>Next</button>
                            <button  type="button" className="btn btn-primary"  onClick={() => table1.setPageIndex(table1.getPageCount() - 1)}>Last page</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TanTable;
