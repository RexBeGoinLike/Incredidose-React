import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

export function EditUserDialog({onSave, userData}) {

    const {
        userid,
        firstname,
        lastname,
        birthdate,
        gender,
        email,
        password,
        contactnum,
        specialization,
        licensenum,
        affiliation,
        role
    } = userData;

    const [itemFirstname, setItemFirstname] = useState(firstname);
    const [itemLastname, setItemLastname] = useState(lastname);
    const [itemGender, setItemGender] = useState(gender);
    const [itemEmail, setItemEmail] = useState(email);
    const [itemPassword, setItemPassword] = useState(password);
    const [itemPhone, setItemPhone] = useState(contactnum);
    const [itemSpecialization, setItemSpecialization] = useState(specialization ? specialization : "");
    const [itemLicenseNumber, setItemLicenseNumber] = useState(licensenum ? licensenum : "");
    const [itemAffiliation, setItemAffiliation] = useState(affiliation ? affiliation : "");

    const [open, setOpen] = useState(false);

    const isChanged = () => {
        return (
            itemFirstname.trim() !== firstname ||
            itemLastname.trim() !== lastname ||
            itemGender !== gender ||
            itemEmail.trim() !== email ||
            itemPassword !== password ||
            itemPhone.trim() !== contactnum ||
            itemSpecialization.trim() !== specialization ||
            itemLicenseNumber.trim() !== licensenum ||
            itemAffiliation.trim() !== affiliation 
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const userItemData = {
            userid: userid,
            firstname: itemFirstname,
            lastname: itemLastname,
            contactnum: itemPhone,
            email: itemEmail,
            password: itemPassword,
            birthdate: birthdate,
            gender: itemGender,
            specialization: itemSpecialization,
            licensenum: itemLicenseNumber,
            affiliation: itemAffiliation,
            role: role
        }

        if (onSave) {
            onSave(userItemData);
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
                    <DialogTitle>Edit User Information</DialogTitle>
                    <DialogDescription>
                        Update the user information as needed.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <FieldGroup className="grid grid-cols-2 gap-6">
                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">First Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemFirstname}
                                    onChange={(e) => setItemFirstname(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Last Name*</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemLastname}
                                    onChange={(e) => setItemLastname(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Email*</FieldLabel>
                                <Input
                                    type="email"
                                    value={itemEmail}
                                    onChange={(e) => setItemEmail(e.target.value)}
                                    required
                                />
                            </Field>
                        </FieldSet>

                        <FieldSet className="flex flex-col gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Phone Number*</FieldLabel>
                                <Input
                                    type="tel"
                                    value={itemPhone}
                                    onChange={(e) => setItemPhone(e.target.value)}
                                    placeholder="09171234567"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Password*</FieldLabel>
                                <Input
                                    type="password"
                                    value={itemPassword}
                                    onChange={(e) => setItemPassword(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Gender*</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemGender}
                                    onChange={(e) => setItemGender(e.target.value)}
                                    placeholder="e.g., Male, Female, Other"
                                    required
                                />
                            </Field>
                        </FieldSet>

                        <FieldSet className="col-span-2 grid grid-cols-3 gap-4">
                            <Field>
                                <FieldLabel className="text-sm font-medium">Specialization</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemSpecialization}
                                    onChange={(e) => setItemSpecialization(e.target.value)}
                                    placeholder="e.g., Cardiology, Pediatrics"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">License Number</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemLicenseNumber}
                                    onChange={(e) => setItemLicenseNumber(e.target.value)}
                                    placeholder="e.g., PRC-123456"
                                />
                            </Field>

                            <Field>
                                <FieldLabel className="text-sm font-medium">Affiliation/Hospital</FieldLabel>
                                <Input
                                    type="text"
                                    value={itemAffiliation}
                                    onChange={(e) => setItemAffiliation(e.target.value)}
                                    placeholder="e.g., St. Luke's Medical Center"
                                />
                            </Field>
                        </FieldSet>

                        <Button className="col-span-2" type="submit" disabled={!isChanged()}>
                            <Pencil />Save
                        </Button>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}