'use client'
import { User } from "@/src/types/userTypes/user"
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import PhoneForm from "./PhoneForm";
import CredentialsForm from "./PasswordForm";
import { useState } from "react";
import PasswordForm from "./PasswordForm";
import EmailForm from "./EmailForm";

type UserFormProps = { user: User }

export default function UserForm({ user }: UserFormProps) {
  const [selected, setSelected] = useState<React.Key>("Teléfono");

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Card className="max-w-full w-[340px] min-h-[310px] max-h-max">
        <CardBody className="overflow-hidden flex ">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected as string}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="Teléfono" title="Teléfono">
              <PhoneForm user={user} />
            </Tab>

            {user.authProvider === 'manual' && (
              <Tab key="Password" title="Password">
                <PasswordForm user={user} />
              </Tab>
            )}

            {user.authProvider === 'manual' && (
              <Tab key="Email" title="Email">
                <EmailForm user={user} />
              </Tab>
            )}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
