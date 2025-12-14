import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { nanoid } from "nanoid";

export function EditPurchaseItemDialog({ onSave, props }) {
    const {
        availableAmt,
        quantity,
        prescriptionitemid
    } = props;

    const [itemUnitPrice, setItemUnitPrice] = useState(1);
    const [itemQuantity, setItemQuantity] = useState(1); 
    const [itemTotalPrice, setItemTotalPrice] = useState(1); 

    const [open, setOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const purchaseItemData = {
            purchaseitemid: nanoid(),
            unitprice: parseFloat(itemUnitPrice) || 0,
            quantity: itemQuantity,
            available: availableAmt,
            totalprice: itemTotalPrice,
            precriptionitemid: prescriptionitemid
        };

        if (onSave) {
            onSave(purchaseItemData);
        }

        setOpen(false);
    };

    const handleUnitPriceChange = (value) => {
        const price = parseFloat(value) || 0;
        setItemUnitPrice(price);
        setItemTotalPrice(price * itemQuantity);
    };

    const handleQuantityChange = (value) => {
        const qty = parseInt(value) || 1;
        const validQty = Math.min(qty, availableAmt);
        setItemQuantity(validQty);
        setItemTotalPrice(itemUnitPrice * validQty);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex h-1/1 items-center justify-center" asChild>
                <Button variant="ghost" size="sm"><Pencil /></Button>
            </DialogTrigger>

            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Purchase Item</DialogTitle>
                    <DialogDescription>
                        Update purchase item details. Total price is calculated automatically.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldGroup className="grid grid-cols-2 gap-6">
                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Unit Price*</FieldLabel>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={itemUnitPrice}
                                    onChange={(e) => handleUnitPriceChange(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Quantity*</FieldLabel>
                                <Input
                                    type="number"
                                    min="1"
                                    max={availableAmt}
                                    value={itemQuantity}
                                    onChange={(e) => handleQuantityChange(e.target.value)}
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Available: {availableAmt} units
                                </p>
                            </Field>
                        </FieldSet>

                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Total Price</FieldLabel>
                                <Input
                                    type="number"
                                    value={itemTotalPrice.toFixed(2)}
                                    readOnly
                                    className="bg-gray-50"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Calculated automatically (Unit Price × Quantity)
                                </p>
                            </Field>
                        </FieldSet>

                        <Button 
                            className="col-span-2" 
                            type="submit" 
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}