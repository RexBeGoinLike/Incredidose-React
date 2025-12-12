import { useEffect, useState } from 'react';
import { Header } from './../common/header'
import { Button } from '@/components/ui/button';
import { Clipboard, Pill, History, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { useNavigate } from 'react-router-dom';


export function PatientDashboard() {

    const [showPrescriptions, setShowPrescriptions] = useState(true);
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="flex flex-col p-10 gap-4">
                    <div>
                        <Button className="grow-0"><Clipboard /> View Report</Button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 ml-auto">
                        <Button 
                            variant={showPrescriptions ? "default" : "outline"}
                            onClick={() => setShowPrescriptions(true)}
                            ><Pill /> Show Prescriptions</Button>
                        <Button 
                            variant={showPrescriptions ? "outline" : "default"}
                            onClick={() => setShowPrescriptions(false)}
                            ><History /> Show Purchase History</Button>
                    </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{showPrescriptions ? "Prescriptions" : "Purchase History"}</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="flex flex-col pt-0 gap-4">
                            {showPrescriptions ? 
                                (
                                    <>
                                        <Item className="p-0">
                                            <ItemContent>
                                                <ItemTitle>Dr. John Smith</ItemTitle>
                                                <ItemDescription>bisaya@gmail.com</ItemDescription>
                                                <ItemDescription>09053195976</ItemDescription>
                                            </ItemContent>
                                            <ItemActions>
                                                <Button onClick={() => navigate(`/common/prescriptioninfo/1`)}><Eye /> View</Button>
                                            </ItemActions>
                                        </Item>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <Item className="p-0">
                                            <ItemContent>
                                                <ItemTitle>Teofilo Salinas</ItemTitle>
                                                <ItemDescription>bisaya@gmail.com</ItemDescription>
                                                <ItemDescription>09053195976</ItemDescription>
                                            </ItemContent>
                                            <ItemActions>
                                                <Button onClick={() => navigate(`/common/purchaseinfo/1`)}><Eye /> View</Button>
                                            </ItemActions>
                                        </Item>
                                    </>
                                )
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}