import { Header } from "@/common/header";
import { Eye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { AddPrescriptionDialog } from "@/doctor/subcomponents/addprescriptionitem";

export function AdminViewPurchases(){

    const{pharmacistid} = useParams();

    const [originalRowData, setOriginalRowData] = useState();

    useEffect(() => {
        fetch(`/server/includes/purchase_manager.php?action=getPurchasesByPharmacist&pharmacistid=${pharmacistid}`)
        .then(res => res.json())
        .then(data => {
            setOriginalRowData(data);
            setRowData(data);
        })
    }, []);
    
    const[rowData, setRowData] = useState(originalRowData);

    const navigate = useNavigate();

    const[colDefs, setColDefs] = useState([
        { headerName: "Date", field: "purchasetimestamp", flex: 1.5, filter: true },
        { headerName: "Action", flex: 0.25,
            cellRenderer: props =>  {
                return(
                    <div className="flex h-1/1 items-center">
                        <Button onClick={() => navigate(`/common/purchaseinfo/${props.data.prescriptionid}`)} variant="ghost"><Eye /></Button>
                    </div>
                )
            }
        }
    ]);

    const handleSave = (data) => {
        navigate(`/doctor/createnewprescription/${patientid}`, { state: { data } });
    };


    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs}>
            </DataTable>
        </>
    );
}