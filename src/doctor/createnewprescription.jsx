import { Header } from './../common/header'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { AddPrescriptionDialog } from './subcomponents/addprescriptionitem';
import { EditPrescriptionDialog } from './subcomponents/editprescriptionitem';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';

export function CreateNewPrescription(props){

    const { prescriptionid } = useParams();

    const location = useLocation();

    const [originalRowData, setOriginalRowData] = useState([location.state.data]);
    
    const tempRowData = originalRowData;

    const [rowData, setRowData] = useState([location.state.data]);

    const editData = (data) => {
        setOriginalRowData(prev => prev.map(item => item.id != data.id ? item : data));
        setRowData(prev => prev.map(item => item.id != data.id ? item : data));

    }

    const deleteData = (id, e) => {
        setOriginalRowData(prev => prev.filter(item => item.id !== id));
        setRowData(prev => {console.log(prev); prev.filter(item => item.id !== id)});
    }

    const [colDefs, setColDefs] = useState([
        { headerName: "Name", field: "name", flex: 2.5, filter: true },
        { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
        { headerName: "Available", field: "quantity", flex: 1, filter: true},
        { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
        { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
        { headerName: "Action",
            cellRenderer: props => {return(
                <div className="flex flex-row gap-4 items-center ">
                    <EditPrescriptionDialog props={props} onSave={(data) => editData(data)}/>
                    <Button variant="ghost" onClick={(e) => deleteData(props.id, e)}><TrashIcon /></Button>
                </div>
            )}
        }
    ]);
    
    const navigate = useNavigate();

    const handleSave = (data) => {
        const newArray = [...originalRowData, data];
        setOriginalRowData(newArray);
        setRowData(newArray);

    }

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.name.includes(value.trim()) || item.brand.includes(value.trim())));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <AddPrescriptionDialog onSave={(data) => handleSave(data)}/>
            </DataTable>
        </>
    );
}