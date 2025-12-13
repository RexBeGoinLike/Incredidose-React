import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function EditPrescriptionDialog({onSave, props}) {

    const {
        id,
        name,
        brand,
        quantity,
        dosage,
        frequency,
        description,
        substitutions
    } = props.data;

    const [itemName, setItemName] = useState(name);
    const [itemBrand, setItemBrand] = useState(brand);
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const [itemDosage, setItemDosage] = useState(dosage);
    const [itemFrequency, setItemFrequency] = useState(frequency);
    const [itemDescription, setItemDescription] = useState(description);
    const [itemSubstitutions, setItemSubstitutions] = useState(substitutions);

    const [open, setOpen] = useState(false);

    const isChanged = () => {
        return (
            itemName.trim() !== name ||
            itemBrand.trim() !== brand ||
            Number(itemQuantity) !== quantity ||
            itemDosage.trim() !== dosage ||
            Number(itemFrequency) !== frequency ||
            itemDescription.trim() !== description ||
            itemSubstitutions !== substitutions
        );
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const prescriptionItemData = {
            name: itemName,
            brand: itemBrand,
            quantity: itemQuantity,
            dosage: itemDosage,
            frequency: itemFrequency,
            description: itemDescription,
            substitutions: itemSubstitutions,
            id: id
        }

        if (onSave) {
            onSave(prescriptionItemData);
        }

        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex h-1/1 items-center justify-center" asChild>
            <Button variant="ghost"><Pencil /></Button>
        </DialogTrigger>

        <DialogContent className="max-w-xl">
            <DialogHeader>
                <DialogTitle>Edit a Prescription Item</DialogTitle>
                <DialogDescription>
                    Fill out the form to proceed.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
                <FieldGroup className="grid grid-cols-2 gap-6">
                    <FieldSet className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel className="text-sm font-medium">Medicine Name*</FieldLabel>
                            <Input
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Frequency (per day)*</FieldLabel>
                            <Input
                                type="number"
                                min={1}
                                value={itemFrequency}
                                onChange={(e) => setItemFrequency(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Quantity*</FieldLabel>
                            <Input
                                type="number"
                                min={1}
                                value={itemQuantity}
                                onChange={(e) => setItemQuantity(e.target.value)}
                            />

                        </Field>

                                <Field>

                                <FieldLabel className="text-sm font-medium">
                                    Substitutions Allowed
                                    <Checkbox
                                    onChange={(e) => setItemSubstitutions(e.target.checked)}
                                    />
                                </FieldLabel>

                        </Field>

                    </FieldSet>

                    <FieldSet className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel className="text-sm font-medium">Brand*</FieldLabel>
                            <Input
                                type="text"
                                value={itemBrand}
                                onChange={(e) => setItemBrand(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Dosage*</FieldLabel>
                            <Input
                                type="text"
                                value={itemDosage}
                                onChange={(e) => setItemDosage(e.target.value)}
                            />
                        </Field>

                    </FieldSet>

                    <Field className="col-span-2">
                        
                        <FieldLabel className="text-sm font-medium">Instructions / Description</FieldLabel>
                        <Textarea
                            type="text"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                        />
                    </Field>

                    <Button className="col-span-2" type="submit" disabled={!isChanged()}>
                        <Pencil />Save
                    </Button>

                </FieldGroup>
            </form>

        </DialogContent>
        </Dialog>
    );
}