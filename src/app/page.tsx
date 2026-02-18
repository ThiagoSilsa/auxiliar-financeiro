"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FaEye, FaEyeSlash, FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

const LoginPage = () => {
  const [canSee, setCanSee] = useState(false);
  const handleAlert = () => {
    toast.success("Bem-vindo!", {
      duration: 4000,
      position: "top-center",
    });
  };

  return (
    <main className="relative">
      <Badge
        className="absolute top-4 right-4 flex gap-2 z-10"
        variant="construction"
      >
        Em contrução
      </Badge>

      <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24">
        <Card className="w-full max-w-md sm:max-w-lg p-4 -mt-30">
            <CardHeader>
              <CardTitle className="text-center font-black text-2xl sm:text-3xl text-chart-5">
                SolarCash
              </CardTitle>
              <CardDescription></CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <FieldSet>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Seu melhor e-mail"
                      autoComplete="email"
                    />
                  </Field>
                  <Field>
                    <div className="flex justify-between items-center">
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                      <Button
                        className="cursor-pointer"
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => setCanSee(!canSee)}
                      >
                        {canSee ? <FaEye /> : <FaEyeSlash />}
                      </Button>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={canSee ? "text" : "password"}
                      placeholder="Sua senha secreta"
                      autoComplete="new-password"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>

              <div className="flex gap-2 items-center justify-center">
                <Link href="/home">
                  <Button
                    onClick={() => handleAlert()}
                    className="mt-4 w-full sm:w-auto cursor-pointer"
                  >
                    Entrar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        <div className="flex gap-3 sm:gap-5 absolute bottom-4 left-1/2 -translate-x-1/2">
          <a
            className="hover:scale-110 transition-transform"
            href="https://github.com/thiagosilsa "
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverCard>
              <HoverCardTrigger className="text-muted-foreground underline cursor-pointer text-2xl sm:text-3xl hover:text-primary">
                <FaGithub />
                </HoverCardTrigger>
                <HoverCardContent>
                  Visite meu GitHub{" "}
                  <Link
                    className="underline hover:text-primary"
                    href="https://github.com/thiagosilsa "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ThiagoSilsa
                  </Link>
                </HoverCardContent>
              </HoverCard>
            </a>
            <Link
              className="hover:scale-110 transition-transform"
              href="https://www.linkedin.com/in/thiago-silsa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverCard>
                <HoverCardTrigger className="text-muted-foreground underline cursor-pointer text-2xl sm:text-3xl hover:text-chart-2">
                  <FaLinkedin />
                </HoverCardTrigger>
                <HoverCardContent>
                  Visite meu LinkedIn{" "}
                  <a
                    className="underline hover:text-chart-2"
                    href="https://www.linkedin.com/in/thiago-silsa/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ThiagoSilsa
                  </a>
                </HoverCardContent>
              </HoverCard>
            </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
