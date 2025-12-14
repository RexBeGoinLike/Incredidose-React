import { Header } from "@/common/header";
import { Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

export function PatientDashboard(){

    const{ patientid } = useParams();
    
    const[rowData, setRowData] = useState();

    useEffect(() => {
        fetch(`/server/includes/prescription_manager.php?action=getPrescriptions&patientid=${patientid}`)
        .then(res => res.json())
        .then(data => {
            setRowData(data);
        });
    }, []);


    const navigate = useNavigate();

    const[colDefs, setColDefs] = useState([
        { headerName: "Issuing Date", field: "dateprescribed", flex: 1.5, filter: true },
        { headerName: "Action", flex: 0.25,
            cellRenderer: props =>  {
                return(
                    <div className="flex h-1/1 items-center">
                        <Button onClick={() => navigate(`/common/prescriptioninfo/${props.data.prescriptionid}`)} variant="ghost"><Eye /></Button>
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