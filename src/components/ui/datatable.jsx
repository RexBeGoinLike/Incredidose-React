import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Input } from "@/components/ui/input";

ModuleRegistry.registerModules([AllCommunityModule]);

export function DataTable(props){

    let {rowData, colDefs, searchFunction, searchPlaceholder, rowHeight, children, pinnedBottomRowData} = props;

    return (
        <div className="flex flex-col gap-4 w-1/1 p-10"> 

            <div className='flex justify-between gap-4 flex-wrap'>
                {searchFunction && (
                    <div className="w-1/3">
                        <Input type="text" onChange={(e) => searchFunction(e.target.value)} placeholder={searchPlaceholder}/>
                    </div>
                )}
                <div className="flex gap-4">
                    {children}
                </div>
            </div>


            <div style={{ height: '70vh', width:'100%'}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    paginationAutoPageSize={true}
                    pagination={true}
                    rowHeight={rowHeight}
                    pinnedBottomRowData={pinnedBottomRowData}
                />
            </div>  
        </div>
 
    );
}