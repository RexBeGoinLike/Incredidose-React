import { Header } from '../common/header'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { Eye, Plus, Pencil } from 'lucide-react'
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogHeader } from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function AdminViewPrescriptions(){

    const { doctorid } = useParams();

    const [originalRowData, setOriginalRowData] = useState();
    const [rowData, setRowData] = useState();
    
    useEffect(() => {
        fetch(`/server/includes/patient_manager.php?action=getPatients&doctorid=${doctorid}`)
        .then(res => res.json())
        .then(data => 
            {
                setOriginalRowData(data);
                setRowData(data);
            }
        );
    }, []);

    const [colDefs, setColDefs] = useState(
        [
            { headerName: "Name", flex: 2.5, filter: true,
                cellRenderer: props => { return props.data.firstname + " " + props.data.lastname;}
            },
            { headerName: "Contact Info", field: "contactnum", flex: 2.5, filter: true  },
            { headerName: "Email", field: "email", flex: 2.5, filter: true  },
            { headerName: "Action", flex: 0.5, cellRenderer: props => {
                return <Button variant="ghost" onClick={() => navigate(`/admin/viewprescriptions/${props.data.userid}`)}><Eye /></Button>
            } }
        ]
    );


    const navigate = useNavigate();

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.firstname.includes(value.trim()) || item.lastname.includes(value.trim()) || item.userid == value.trim()));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a patient's name, email, or id..."}>
            </DataTable>
        </>
    );
}