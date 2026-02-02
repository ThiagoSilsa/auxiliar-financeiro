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


const LoginPage = () => {
  const [canSee, setCanSee] = useState(false);
  const handleAlert = () => {
    toast.success("Bem-vindo!", {
      duration: 4000,
      position: "top-center",
    });
  };

  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <div>
          <Badge
            className="absolute top-4 right-4 flex gap-2"
            variant="construction"
          >
            Em contrução
          </Badge>

          <Card className="container md:w-lg p-4 mx-auto -mt-50 ">
            <CardHeader>
              <CardTitle className="mt-4 text-center font-black text-3xl text-chart-5">
                SolarCash
              </CardTitle>
              <CardDescription></CardDescription>
              <CardAction></CardAction>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <label htmlFor="email">E-mail</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="mt-2"
                  placeholder="Seu melhor e-mail"
                  autoComplete="email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password">Senha</label>

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
                  className="mt-2"
                  placeholder="Sua senha secreta"
                  autoComplete="new-password"
                />
              </div>

              <div className="flex gap-2 items-center justify-center">
                <Link href="/home">
                  <Button
                    onClick={() => handleAlert()}
                    className="mt-4  cursor-pointer"
                  >
                    Entrar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-5 absolute bottom-4 left-1/2 -translate-x-1/2">
            <a
              className="hover:scale-110 transition-transform"
              href="https://github.com/thiagosilsa "
              target="_blank"
              rel="noopener noreferrer"
            >
              <HoverCard>
                <HoverCardTrigger className="text-muted-foreground underline cursor-pointer text-3xl hover:text-primary">
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
                <HoverCardTrigger className="text-muted-foreground underline cursor-pointer text-3xl hover:text-chart-2">
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
    </main>
  );
};

export default LoginPage;
