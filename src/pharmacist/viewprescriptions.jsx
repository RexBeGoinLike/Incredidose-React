import { Header } from "@/common/header";
import { Eye, Plus } from "lucide-react";
import { useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AddPrescriptionDialog } from "@/doctor/subcomponents/addprescriptionitem";

export function PharmacistViewPrescriptions(props){

    const{patientid, doctorid} = props;


    const [originalRowData, setOriginalRowData] = useState([
        {
            prescriptionid: 42,
            dateprescribed: "2025-10-15 14:30:00",
            validperiod: "2025-11-15",
            patientid: 21,
            doctorid: 41,
            patientName: "Juan Cruz",
            doctorName: "Drake Mitchell",
        },
        {
            prescriptionid: 43,
            dateprescribed: "2025-10-20 09:15:00",
            validperiod: "2025-11-20",
            patientid: 22,
            doctorid: 42,
            patientName: "Maria Santos",
            doctorName: "Olivia Johnson",
        }
    ]);
    
    const[rowData, setRowData] = useState(originalRowData);

    const navigate = useNavigate();

    const[colDefs, setColDefs] = useState([
        { headerName: "Issuing Date", field: "dateprescribed", flex: 1.5, filter: true },
        { headerName: "Action", flex: 0.25,
            cellRenderer: props =>  {
                return(
                    <div className="flex h-1/1 items-center">
                        <Button onClick={() => navigate('/pharmacist/viewprescriptions/prescriptioninfo ')} variant="ghost"><Eye /></Button>
                    </div>
                )
            }
        }
    ]);


    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} />
        </>
    );
}