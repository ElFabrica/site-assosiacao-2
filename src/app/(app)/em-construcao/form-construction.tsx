"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export function FormConstruction() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/unlock", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/";
    } else {
      setError(true);
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle>Site em construção</CardTitle>
        <CardDescription>Digite a senha para acessar</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Field>
            <FieldLabel>Senha</FieldLabel>
            <Input
              placeholder="******"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <FieldError>Senha incorreta</FieldError>}
          </Field>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            Acessar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
