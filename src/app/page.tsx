"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaLinkedin,
  FaRegSun,
} from "react-icons/fa";
import { toast } from "sonner";
import { MdOutlineMail } from "react-icons/md";
import { PiPaintBrush } from "react-icons/pi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TbPassword } from "react-icons/tb";

const LoginPage = () => {
  const [canSee, setCanSee] = useState(false);

  const handleAlert = () => {
    toast.success("Login bem-sucedido!");
  };

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/jessica-woulfe-login.jpg"
          alt="background image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div
        className="absolute bottom-0 right-0 w-3/5 h-screen p-8 bg-linear-to-t
        from-black/80 from-10% to-transparent to-40% z-0 flex flex-col justify-end"
      >
        <div className="flex justify-between items-end">
          <div className="flex flex-col text-white">
            <h1 className="text-4xl  font-bold mb-4 ">
              Seja positivo com suas finanças.
            </h1>
            <p className="text-lg mb-8">
              Gerencie suas finanças de forma sustentável e inteligente.
            </p>
          </div>
          {/* Links */}
          <div className="flex gap-3 sm:gap-5">
            <a
              className="hover:scale-110 transition-transform"
              href="https://github.com/thiagosilsa"
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
      </div>
      <div className="absolute z-5 top-0 right-0 m-4">
        <HoverCard>
          <HoverCardTrigger className="text-muted-foreground/50 cursor-pointer text-2xl hover:text-ring shadow-md">
            <PiPaintBrush />
          </HoverCardTrigger>
          <HoverCardContent>
            Crédito para a artista{" "}
            <Link
              className="underline hover:text-primary"
              href="https://www.artstation.com/jessicawoulfe"
              target="_blank"
              rel="noopener noreferrer"
            >
              @JessicaWoulfe
            </Link>
          </HoverCardContent>
        </HoverCard>
      </div>
      <Card className="absolute top-0 left-0 w-2/5 h-screen p-8 shadow-xl rounded-none z-10">
        <CardHeader>
          <CardTitle className="flex items-center justify-start text-2xl sm:text-3xl text-chart-5">
            <div className="flex items-center">
              <div>
                <FaRegSun size={35} />
              </div>
              <div className="flex ml-1 font-sans">
                <p className="font-bold ">Solar</p>
                <p className="font-normal">Cash</p>
              </div>
            </div>
          </CardTitle>
          <CardAction className="flex items-center justify-center">
            <Badge
              className="absolute top-4 right-4 flex gap-2 z-10"
              variant="construction"
            >
              Em construção
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-screen">
          <FieldSet className="w-full max-w-md">
            <FieldGroup>
              <CardTitle className="text-2xl font-bold -mb-6">
                Bem-vindo(a)
              </CardTitle>
              <CardDescription className="mb-6">
                Comece sua jornada financeira sustentável conosco.
              </CardDescription>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    autoComplete="email"
                  />
                  <InputGroupAddon>
                    <MdOutlineMail />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <CheckIcon className="hidden" />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    name="password"
                    type={canSee ? "text" : "password"}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                  />
                  <InputGroupAddon>
                    <TbPassword />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setCanSee((prev) => !prev)}
                    >
                      {!canSee ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
            <FieldGroup>
              <div className="flex justify-between">
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="size-4"
                  />
                  <Label htmlFor="remember" className="ml-2 text-sm">
                    Lembrar-me por 30 dias
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-chart-5 hover:underline self-end"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Link href="/home">
                <Button className="w-full mt-6" onClick={handleAlert}>
                  Entrar
                </Button>
              </Link>
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="flex items-center justify-center mt-10">
          <p className="text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link href="/register" className="text-chart-5 hover:underline">
              Registre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
};

export default LoginPage;
