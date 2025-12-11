import { Header } from './header'
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, Check, Eye} from 'lucide-react'
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

export function PrescriptionInfo(){

    const { prescriptionid } = useParams();
    const [ searchKey, setSearchKey ] = useState("");
    const navigate = useNavigate();

    return(
        <>
            <Header />
            <div className="flex flex-col p-10 gap-4">
                <div className="flex justify-between">
                        <Input
                            type="text"
                            placeholder="Enter Medicine Brand or Name"
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            className="w-1/3"
                        />
                        <div className="flex gap-4">
                            <Button onClick={() => navigate(`/common/purchases/${prescriptionid}`)}><ShoppingBag /> View Purchases</Button>
                        </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Dosage</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Ibuprofen</TableCell>
                            <TableCell>Generic</TableCell>
                            <TableCell>10 (20)</TableCell>
                            <TableCell>Ibuprofen</TableCell>
                            <TableCell className="text-right">
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
                                                    <p className="text-xs">Ibuprofen</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm">Brand</h3>
                                                    <p className="text-xs">Generic</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm">Frequency</h3>
                                                    <p className="text-xs">every 1 days</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-6">
                                                <div>
                                                    <h3 className="text-sm">Quantity</h3>
                                                    <p className="text-xs">10 (20)</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm">Dosage</h3>
                                                    <p className="text-xs">10mg</p>
                                                </div>
                                                <div>
                                                    <h3 className="text-sm">Substitutions</h3>
                                                    <Check />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-sm">Description</h3>
                                            <p className="whitespace-normal text-xs">Erm What the Sigma Erm What the Sigma Sigma Erm What the Sigma</p>  
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    );
}