"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export function PasswordInput(
  props: React.ComponentProps<typeof InputGroupInput>,
) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
     <InputGroup>
        <InputGroupInput
           {...props}
           type={showPassword ? "text" : "password"}
        />

        <InputGroupAddon align="inline-end">
           <InputGroupButton
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label={
                 showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShowPassword((previous) => !previous)}
           >
              {showPassword ? <EyeOff /> : <Eye />}
           </InputGroupButton>
        </InputGroupAddon>
     </InputGroup>
  );
}
