import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Input } from "@/components/ui/input";

ModuleRegistry.registerModules([AllCommunityModule]);

export function DataTable(props){

    let {rowData, colDefs, allowSearch, searchFunction, rowHeight} = props;

    rowHeight = (rowHeight == null) ? 42.4 : rowHeight;

    return (
        <div className="flex flex-col gap-4 w-1/1"> 
            {allowSearch && (
                <div className="w-1/3">
                    <Input type="text" onChange={(e) => searchFunction(e.target.value)} />
                </div>
                )}


            <div style={{ height: '70vh', width:'100%'}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    paginationAutoPageSize={true}
                    pagination={true}
                    rowHeight={rowHeight}
                />
            </div>  
        </div>
 
    );
}