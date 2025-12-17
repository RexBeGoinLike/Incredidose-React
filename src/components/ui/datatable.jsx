import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { Input } from "@/components/ui/input";
import { useMemo, useEffect, useState, useCallback } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

export function DataTable(props){
    let {rowData, colDefs, searchFunction, searchPlaceholder, rowHeight, children, pinnedBottomRowData} = props;
    
    const [isMobile, setIsMobile] = useState(false);
    const [currentColDefs, setCurrentColDefs] = useState(colDefs);

    const checkScreenSize = useCallback(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    useEffect(() => {
        if (!colDefs || colDefs.length === 0) {
            setCurrentColDefs(colDefs);
            return;
        }

        const updatedColDefs = colDefs.map((col, index) => {
            if (!isMobile) {
                return { ...col, hide: false };
            }
            
            const totalColumns = colDefs.length;
            const isFirstColumn = index === 0;
            const isSecondColumn = index === 1;
            const isLastColumn = index === totalColumns - 1;
            

            const shouldShow = isFirstColumn || isSecondColumn || isLastColumn;
  
            
            return {
                ...col,
                hide: !shouldShow
            };
        });
        
        setCurrentColDefs(updatedColDefs);
    }, [colDefs, isMobile]);

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, [checkScreenSize]);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true,
    }), []);

    const getMobileColumnsInfo = () => {
        if (!colDefs || colDefs.length === 0) return "";
        
        const firstColName = colDefs[0]?.headerName || colDefs[0]?.field || "Column 1";
        const secondColName = colDefs[1]?.headerName || colDefs[1]?.field || "Column 2";
        const lastColName = colDefs[colDefs.length - 1]?.headerName || 
                          colDefs[colDefs.length - 1]?.field || 
                          `Column ${colDefs.length}`;
        
        return `${firstColName}, ${secondColName}, and ${lastColName}`;
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4 md:p-10 pt-5"> 
            <div className='flex justify-between gap-4 flex-wrap'>
                {searchFunction && (
                    <div className="w-full md:w-1/3">
                        <Input 
                            type="text" 
                            onChange={(e) => searchFunction(e.target.value)} 
                            placeholder={searchPlaceholder}
                        />
                    </div>
                )}
                <div className="flex gap-4">
                    {children}
                </div>
            </div>

            {isMobile && colDefs && colDefs.length > 0 && (
                <div className="text-sm text-muted-foreground mb-2 bg-blue-50 p-2 rounded">
                    Mobile view: Showing {getMobileColumnsInfo()}
                </div>
            )}

            <div style={{ height: '70vh', width:'100%'}}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={currentColDefs}
                    defaultColDef={defaultColDef}
                    paginationAutoPageSize={true}
                    pagination={true}
                    rowHeight={rowHeight}
                    pinnedBottomRowData={pinnedBottomRowData}
                />
            </div>  
        </div>
    );
}