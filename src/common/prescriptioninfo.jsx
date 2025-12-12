import { Header } from './header'
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, Eye} from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';

export function PrescriptionInfo(){

    const { prescriptionid } = useParams();
    const [originalRowData, setOriginalRowData] = useState(
        [
            {name: "Ibuprofen", brand: "Alaxan", available: 10, quantity: 20, dosage: 20, substitutions: true, frequency: 1, description: ""},
            {name: "Paracetamol", brand: "Generic", available: 10, quantity: 20, dosage: 20, substitutions: true, frequency: 1, description: "No king"}
        ]
    )

    const [rowData, setRowData] = useState(originalRowData);

    const [colDefs, setColDefs] = useState([
        { headerName: "Name", field: "name", flex: 2.5, filter: true },
        { headerName: "Brand", field: "brand", flex: 2.5, filter: true  },
        { headerName: "Available", field: "available", flex: 1, filter: true},
        { headerName: "Quantity", field: "quantity", flex: 1, filter: true },
        { headerName: "Dosage", field: "dosage", flex: 1, filter: true  },
        { headerName: "Action",
             cellRenderer: props => {
            const { name, brand, available, quantity, dosage, frequency, substitutions, description } = props.data;
            return(<div className="flex items-center h-1/1 w-1/1">
                <Dialog>
                    <DialogTrigger>
                        <Eye /> 
                    </DialogTrigger>
                    <DialogContent className="w-fit">
                        <DialogHeader>
                            <DialogTitle>Prescription Information</DialogTitle>
                            <DialogDescription>View additional prescription information</DialogDescription>
                        </DialogHeader>
                        <Separator />
                        <div className="flex gap-4 justify-between">
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h3 className="text-sm">Name</h3>
                                    <p className="text-xs">{name}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm">Brand</h3>
                                    <p className="text-xs">{brand}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm">Frequency</h3>
                                    <p className="text-xs">every {frequency} days</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h3 className="text-sm">Quantity</h3>
                                    <p className="text-xs">{available} ({quantity}))</p>
                                </div>
                                <div>
                                    <h3 className="text-sm">Dosage</h3>
                                    <p className="text-xs">{dosage}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm">Substitutions</h3>
                                    <p className="text-xs">{(substitutions) ? "Allowed" : "Not Allowed"}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            {description && (
                                <>
                                    <h3 className="text-sm">Description</h3>
                                    <p className="whitespace-normal text-xs">{description}</p>
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>);
        }, flex: 1
        }
    ]);

    const navigate = useNavigate();

    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.name.includes(value.trim()) || item.brand.includes(value.trim())));
    };

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder={"Enter brand or medicine name..."}>
                <Button onClick={() => navigate(`/common/purchaseinfo/${prescriptionid}`)}><ShoppingBag /> View Purchases</Button>
            </DataTable>
        </>
    );
}