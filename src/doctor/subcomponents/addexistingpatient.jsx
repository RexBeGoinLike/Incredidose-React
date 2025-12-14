import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { FieldGroup, FieldSet, Field, FieldLabel } from "@/components/ui/field";

export function AddPatientDialog({onSave, props}) {
    
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
    } = props.data;

    const [userFirstName, setUserFirstName] = useState(firstname ? firstname : "");
    const [userLastName, setUserLastName] = useState(lastname ? lastname : "");
    const [userContactNum, setUserContactNum] = useState(contactnum ? contactnum : "");
    const [userEmail, setUserEmail] = useState(email ? email : "");
    const [userPassword, setUserPassword] = useState(password ? password : "");
    const [userBirthdate, setUserBirthdate] = useState(birthdate ? birthdate : "");
    const [userGender, setUserGender] = useState(gender ? gender : "");

    const isChanged = () => {
        return (
            userFirstName.trim() !== firstname ||
            userLastName.trim() !== lastname ||
            Number(userContactNum) !== contactnum ||
            userEmail.trim() !== email ||
            userPassword.trim() !== password ||
            userBirthdate.trim() !== birthdate ||
            userGender.trim() !== gender
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         
        const userData = {
            firstname: userFirstName,
            lastname: userLastName,
            contactnum: userContactNum,
            email: userEmail,
            password: userPassword,
            birthdate: userBirthdate,
            gender: userGender,
            userid: userid,
            role: role,
            createdat: createdat
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
                            <FieldLabel className="text-sm font-medium">Password*</FieldLabel>
                            <Input
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
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
                    </FieldSet>

                    <Field className="col-span-2">
                        <FieldLabel className="text-sm font-medium">Gender*</FieldLabel>
                        <Input
                            type="text"
                            value={userGender}
                            onChange={(e) => setUserGender(e.target.value)}
                        />
                    </Field>

                    <Button className="col-span-2" type="submit" disabled={!isChanged()}>
                        <Pencil />Save
                    </Button>

                </FieldGroup>
            </form>
        </>
    );
}