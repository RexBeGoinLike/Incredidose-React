import { Header } from './header'
import { useNavigate, useParams } from 'react-router-dom';
import { Receipt } from 'lucide-react'
import { useState } from 'react';
import { DataTable } from '@/components/ui/datatable';
import { Button } from '@/components/ui/button';

export function Payments(){

    const { purchaseid } = useParams();
    const [originalRowData, setOriginalRowData] = useState(
        [
            {paymentmethod: "Cash", amount: 100, paymentdate: new Date(), status: "Complete", referenceno: "98100009897902"},
        ]
    )

    const [rowData, setRowData] = useState(originalRowData);

    const [colDefs, setColDefs] = useState(
        [
            { headerName: "Payment Method", field: "paymentmethod", flex: 1, filter: true },
            { headerName: "Amount", field: "amount", flex: 1, filter: true  },
            { headerName: "Payment Date", field: "paymentdate", flex: 1, filter: true },
            { headerName: "Status", field: "status", flex: 1, filter: true  },
            { headerName: "Reference No", field: "referenceno", flex: 1 }
        ]
    );
    
    const searchFunction = (value) => {
        setRowData(originalRowData.filter(item => item.referenceno.includes(value.trim())));
    };
    
    const navigate = useNavigate();

    return(
        <>
            <Header />
            <DataTable rowData={rowData} colDefs={colDefs} searchFunction={searchFunction} searchPlaceholder="Enter the payment reference number..."/>
        </>
    );
}