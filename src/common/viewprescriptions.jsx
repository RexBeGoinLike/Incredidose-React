import { Header } from "@/common/header";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

export function ViewPrescriptions(props){

    const[patientid, doctorid] = props;

    const[originalRowData, setOriginalRowData] = useState([

    ]);

    const[rowData, setRowData] = useState(originalRowData);

    const[colDefs, setColDefs] = useState([
        { headerName: "Issuing Date", field: "dateprescribed", filter: true },
        { headerName: "Action", flex: 0.5,
            cellRenderer: props =>  {
                <DropdownMenu>
                    <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
                </DropdownMenu>
            }
        },
    ]);

    return(
        <>
            <Header />
            <DataTable>
            </DataTable>
        </>
    );
}