import { Header } from "@/common/header";
import { FileText, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function ViewLogs() {
    const navigate = useNavigate();

    const [logsData, setLogsData] = useState([]);

    useEffect(() => {
        fetch(`/api/admin/logs`)
        .then(res => res.json())
        .then(data => {
            setLogsData(data.logs);
        })
    }, []);

    const [colDefs, setColDefs] = useState([
        { 
            headerName: "User", 
            field: "userid", 
            flex: 0.5, 
            filter: true 
        },
        { 
            headerName: "Description", 
            field: "description", 
            flex: 2, 
            filter: true 
        },
        { 
            headerName: "Action", 
            field: "action", 
            flex: 1, 
            filter: true 
        },
        { 
            headerName: "Activity Date/Time", 
            field: "timestamp", 
            flex: 1, 
            filter: true 
        },
        { 
            headerName: "Target Entity", 
            field: "targetentitytype", 
            flex: 0.5, 
            filter: true 
        },
        { 
            headerName: "Target", 
            field: "targetid", 
            flex: 0.5, 
            filter: true 
        }
    ]);

    return (
        <>
            <Header />
                <DataTable 
                    rowData={logsData} 
                    colDefs={colDefs}
                />
        </>
    );
}