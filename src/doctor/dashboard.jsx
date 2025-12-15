import { Header } from './../common/header'
import { Form, useNavigate, useParams } from 'react-router-dom';
import { Plus, Pencil } from 'lucide-react'
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
import { FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { PatientViewRenderer } from './subcomponents/managepatientrenderer';
import { AddPatientDialog } from './subcomponents/addexistingpatient';
import { AddNewPatientDialog } from './subcomponents/addnewpatient';

function AddExistingPatient(){

    const[patientData, setPatientData] = useState([]);

    function emailSearchFunction(value){
        fetch(`/server/includes/patient_manager.php?action=getPatientByEmail&email=${value}`)
        .then(res => res.json())
        .then(data => {setPatientData(data)});
    }
    
    const navigate = useNavigate();

    return(
        <>
            <Label className="text-sm" for="searchemail">Search</Label>
            <Input id="searchemail" placeholder="Enter a patient's email"  
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        emailSearchFunction(e.target.value.trim());
                    }
            }}></Input>

            {patientData.map(patient => {
                return(
                <div key={patient.userid} className="grid grid-cols-2 gap-6 pt-4">
                    <div className="flex flex-col gap-4">
                        <div>
                            <FieldLabel className="text-sm">First Name</FieldLabel>
                            <p className="text-xs">{patient.firstname}</p>
                        </div>

                        <div>
                            <FieldLabel className="text-sm">Last Name</FieldLabel>
                            <p className="text-xs">{patient.lastname}</p>
                        </div>

                        <div>
                            <FieldLabel className="text-sm">Contact Number</FieldLabel>
                            <p className="text-xs">{patient.contactnum}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div>
                            <FieldLabel className="text-sm">Email</FieldLabel>
                            <p className="text-xs">{patient.email}</p>
                        </div>

                        <div>
                            <FieldLabel className="text-sm">Birth Date</FieldLabel>
                            <p className="text-xs">{patient.birthdate.split(" ")[0]}</p>
                        </div>

                        
                        <div>
                            <FieldLabel className="text-sm">Gender</FieldLabel>
                            <p className="text-xs">{patient.gender}</p>
                        </div>
                    </div>


                    <Button className="col-span-2" onClick={() => navigate(`/doctor/prescriptionlist/${patient.userid}`)}>
                        <Pencil />Save
                    </Button>

                </div>
                )
            })}
        </>
    );

}

export function DoctorDashboard(){

    const { doctorid } = useParams();

    const [originalRowData, setOriginalRowData] = useState();
    const [rowData, setRowData] = useState();
    
    useEffect(() => {
        fetch(`/server/includes/patient_manager.php?action=getPatients`)
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

    function handleCreatePatient(data){
        fetch(`/server/includes/patient_manager?action=addPatient`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => navigate(`/doctor/prescriptionlist/${data.patientid}`));

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
                                <AddNewPatientDialog onSave={(data) => handleCreatePatient(data)}/>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </DataTable>
        </>
    );
}