import { Header } from './../common/header'
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react'
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

import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-separator';
import { Label } from '@radix-ui/react-label';
import { PatientViewRenderer } from './subcomponents/managepatientrenderer';

export function DoctorDashboard(){

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
            { headerName: "Action", flex: 0.5, cellRenderer: PatientViewRenderer }
        ]
    );


    const navigate = useNavigate();

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.firstname.includes(value.trim()) || item.lastname.includes(value.trim()) || item.userid == value.trim()));
    };

    function AddExistingPatient(){
        
        
        const[patientData, setPatientData] = useState([]);

        function searchFunction(){
            
        }

        return(
            <>
                <Label className="text-sm" for="searchemail">Search</Label>
                <Input id="searchemail" placeholder="Enter a patient's email"  
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchFunction;
                        }
                }}></Input>
            </>
        );

    }
    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter a patient's name, email, or id..."}>
                <Dialog >
                    <DialogTrigger asChild>
                        <Button><Plus /> Add Patient</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a Patient</DialogTitle>
                            <DialogDescription>Add an existing patient using their email or create a new account</DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="search">
                            <TabsList>
                                <TabsTrigger value="search">Existing Patient</TabsTrigger>
                                <TabsTrigger value="new">New Patient</TabsTrigger>
                            </TabsList>
                            <TabsContent value="search">
                                <AddExistingPatient />
                            </TabsContent>
                            <TabsContent value="new">

                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </DataTable>
        </>
    );
}