import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";

export function AddNewPatientDialog({onSave}) {

    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userContactNum, setUserContactNum] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userBirthdate, setUserBirthdate] = useState("");
    const [userGender, setUserGender] = useState("");

    const isChanged = () => {
        return (
            userFirstName.trim() &&
            userLastName.trim() &&
            Number(userContactNum) &&
            userEmail.trim() &&
            userBirthdate.trim() &&
            userGender.trim()
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const userData = {
            firstname: userFirstName,
            lastname: userLastName,
            contactnum: userContactNum,
            email: userEmail,
            birthdate: userBirthdate,
            gender: userGender
        }

        if (onSave) {
            onSave(userData);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <FieldGroup className="grid grid-cols-2 gap-6">
                    <FieldSet className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel className="text-sm font-medium">First Name*</FieldLabel>
                            <Input
                                type="text"
                                value={userFirstName}
                                onChange={(e) => setUserFirstName(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Last Name*</FieldLabel>
                            <Input
                                type="text"
                                value={userLastName}
                                onChange={(e) => setUserLastName(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Contact Number*</FieldLabel>
                            <Input
                                type="number"
                                value={userContactNum}
                                onChange={(e) => setUserContactNum(e.target.value)}
                            />
                        </Field>
                    </FieldSet>

                    <FieldSet className="flex flex-col gap-4">
                        <Field>
                            <FieldLabel className="text-sm font-medium">Email*</FieldLabel>
                            <Input
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />
                        </Field>

                        <Field>
                            <FieldLabel className="text-sm font-medium">Birth Date*</FieldLabel>
                            <Input
                                type="datetime-local"
                                value={userBirthdate}
                                onChange={(e) => setUserBirthdate(e.target.value)}
                            />
                        </Field>

                        
                        <Field>
                            <FieldLabel className="text-sm font-medium">Gender*</FieldLabel>
                            <Input
                                type="text"
                                value={userGender}
                                onChange={(e) => setUserGender(e.target.value)}
                            />
                        </Field>
                    </FieldSet>


                    <Button className="col-span-2" type="submit" disabled={!isChanged()}>
                        <Pencil />Save
                    </Button>

                </FieldGroup>
            </form>
        </>
    );
}