"use client";

// Components
import {
  ContainerDiv,
  MainContainer,
} from "@/components/created/main-container/main-container";
import { Button } from "@/components/ui/button";

// icons
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import {
  FaArrowDown,
  FaChartLine,
  FaEye,
  FaEyeSlash,
  FaPiggyBank,
  FaWallet,
} from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const [isSeenValues, setIsSeenValues] = useState(true);

  return (
    <main>
      <MainContainer>
        <ContainerDiv className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="w-full">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaWallet className="bg-primary text-white size-9 p-2 rounded-md" />
                  <div>
                    <p className="font-bold text-lg">Saldo Geral</p>
                    <p className="text-sm dark:text-white/50 text-black/50">
                      Todas as contas
                    </p>
                  </div>
                </div>
                <Button
                  className="hover:text-white"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => setIsSeenValues(!isSeenValues)}
                >
                  {isSeenValues ? (
                    <FaEye className="size-4" />
                  ) : (
                    <FaEyeSlash className="size-4" />
                  )}
                </Button>
              </div>
              <p className="text-2xl mb-2 font-bold">
                {isSeenValues ? "R$ 22.105,66" : "****"}
              </p>
              <div className="flex gap-4 mb-4 flex-col md:flex-row">
                <div className="flex items-center gap-2">
                  <FaArrowTrendUp className="size-9 bg-primary/30 p-2 rounded-full" />
                  <div className="flex-col items-center">
                    <p className="text-sm dark:text-white/70 text-black/70">
                      Entradas
                    </p>
                    <span>{isSeenValues ? "R$ 1.500,00" : "****"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaArrowTrendDown className="size-9 bg-destructive/30 p-2 rounded-full" />
                  <div className="flex-col items-center">
                    <p className="text-sm dark:text-white/70 text-black/70">
                      Saídas
                    </p>
                    <span>{isSeenValues ? "R$ 900,00" : "****"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaChartLine className="size-4 text-secondary/70" />
                <p className="text-sm dark:text-white/70 text-black/70">
                  52.6% em relação ao mês anterior
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent>
              <div className="flex items-center gap-2">
                <BsBank className="bg-primary text-white size-9 p-2 rounded-md" />
                <div>
                  <p className="font-bold text-lg">Contas</p>
                  <p className="text-sm dark:text-white/50 text-black/50">
                    2 contas vinculadas
                  </p>
                </div>
              </div>
              <Carousel className="w-[70%] m-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col items-center">
                          <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
                            Nubank
                          </h2>
                          <p>Conta Principal</p>
                        </div>

                        <p className="text-2xl font-bold">
                          {isSeenValues ? "R$ 5.000,00" : "****"}
                        </p>
                        <p>
                          Projeção : {isSeenValues ? "R$ 12.000,00" : "****"}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
          <Card className="w-full flex flex-col gap-4">
            <CardContent>
              <div className="flex items-center gap-2">
                <FaPiggyBank className="bg-primary text-white size-9 p-2 rounded-md" />
                <div>
                  <p className="font-bold text-lg">Guardado</p>
                  <p className="text-xl font-medium">
                    {isSeenValues ? "R$ 5.000,00" : "****"}
                  </p>
                  <p className="text-sm dark:text-white/50 text-black/50">
                    Em 4 caixinhas
                  </p>
                </div>
              </div>
              <Carousel className="w-[70%] m-auto">
                <CarouselContent>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 flex flex-col items-center justify-center gap-2">
                        <div className="flex flex-col items-center">
                          <h2 className="text-xl font-bold text-purple-800 dark:text-purple-300">
                            Fazer uma viagem
                          </h2>
                        </div>

                        <p className="text-2xl font-bold">
                          {isSeenValues ? "R$ 5.000,00" : "****"}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </ContainerDiv>
        <ContainerDiv className="grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="w-full">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaWallet className="bg-primary text-white size-9 p-2 rounded-md" />
                  <div>
                    <p className="font-bold text-lg">Últimas Transações</p>
                    <p className="text-sm dark:text-white/50 text-black/50">
                      Todas as contas
                    </p>
                  </div>
                </div>
                <Button variant="link">Visualizar Extrato</Button>
              </div>
              <div className="flex flex-col gap-3 overflow-auto max-h-60 pr-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    className="flex justify-between items-center "
                    key={index}
                  >
                    <FaArrowDown className="size-6 bg-destructive/30 p-1.5 rounded-full" />
                    <div className="flex-1 mx-4">
                      <p className="font-medium">Pagamento de Conta de Luz</p>
                      <div className="flex items-center gap-2 justify-left">
                        <Badge variant={"outline"}>Moradia</Badge>
                        <p className="text-xs">Nubank</p>
                      </div>
                    </div>
                    <div className="flex-col text-right">
                      <p className="font-bold text-destructive">
                        {isSeenValues ? "- R$ 150,00" : "****"}
                      </p>
                      <p className="text-sm text-black/50 dark:text-white/50">
                        12/12/2025
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <FaChartLine className="bg-primary text-white size-9 p-2 rounded-md" />
                  <div>
                    <p className="font-bold text-lg">Gráfico</p>
                    <p className="text-sm dark:text-white/50 text-black/50">
                      Gráfico futuro de contas
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </ContainerDiv>
      </MainContainer>
    </main>
  );
};

export default HomePage;
