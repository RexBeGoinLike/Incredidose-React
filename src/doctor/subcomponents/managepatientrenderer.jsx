import { Children, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";
import { useAuth } from "@/common/auth";

export function PatientViewRenderer({ data }) {
    const {
        userid,
        firstname,
        lastname,
        contactnum,
        email,
        password,
        birthdate,
        createdat,
        role,
        gender
    } = data;

    const [firstName, setFName] = useState(firstname);
    const [lastName, setLName] = useState(lastname);
    const [contactNum, setCNum] = useState(contactnum);
    const [emailAddress, setEmailAddress] = useState(email);
    const [birthDate, setBirthdate] = useState(birthdate);
    const [gndr, setGender] = useState(gender);

    const { user } = useAuth();
    const isChanged = () => {
        return (
            firstName.trim() != firstname ||
            lastName.trim() != lastname ||
            Number(contactNum) != contactnum ||
            emailAddress.trim() != email ||
            birthDate != birthdate ||
            gndr != gender
        );
    };

    const navigate = useNavigate();

    return (
        <Dialog>
        <DialogTrigger className="flex h-1/1 items-center justify-center">
            <Eye />
        </DialogTrigger>

        <DialogContent className="max-w-xl">
            <DialogHeader>
            <DialogTitle>View and Edit Patient Information</DialogTitle>
            <DialogDescription>
                A detailed view of the patient's information.
            </DialogDescription>
            </DialogHeader>

            <Button onClick={() => {navigate(`/doctor/prescriptionlist/${user.userid}/${userid}`)}} className="mb-4">Manage Prescriptions</Button>

            <form>
                <FieldGroup className="grid grid-cols-2 gap-6">
                <FieldSet className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel className="text-sm font-medium">First Name</FieldLabel>
                        <Input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFName(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="text-sm font-medium">Birthdate</FieldLabel>
                        <Input
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="text-sm font-medium">Mobile Number</FieldLabel>
                        <Input
                            type="number"
                            value={contactNum}
                            onChange={(e) => setCNum(e.target.value)}
                        />
                    </Field>
                </FieldSet>
                <FieldSet className="flex flex-col gap-4">
                    <Field>
                        <FieldLabel className="text-sm font-medium">Last Name</FieldLabel>
                        <Input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="text-sm font-medium">Gender</FieldLabel>
                        <Input
                            type="text"
                            value={gndr}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="text-sm font-medium">Email</FieldLabel>
                        <Input
                            type="email"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                    </Field>
                </FieldSet>

                <Button className="col-span-2" type="submit" disabled={!isChanged()}>Edit</Button>
                </FieldGroup>
            </form>

        </DialogContent>
        </Dialog>
    );
}