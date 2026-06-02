import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ConfettiStore from '../components/confetti';
import Form from './form';

export default function OnBoard() {
  const [activeConfetti, setActiveConfetti] = useState(false);
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {!showModal ? null : (
        <div
          className={cn('absolute w-full h-full z-50 top-0 left-0 bg-white/70 backdrop-blur-sm')}
        >
          <div className="mr-auto ml-auto max-w-xl mt-36">
            {!activeConfetti ? (
              <Card className="border-gray-200 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-[#1f2937] text-3xl">Crie sua Loja</CardTitle>
                  <CardDescription className="text-gray-600">
                    Em poucos passos, você terá seu catálogo digital pronto para exibir produtos e
                    vitrines de forma personalizada. Crie sua primeira loja para começar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form activeConfetti={setActiveConfetti} />
                </CardContent>
              </Card>
            ) : (
              <Card className="border-gray-200 shadow-2xl relative z-10">
                <CardHeader>
                  <CardTitle className="text-[#1f2937] text-3xl">Parabéns 🎉 </CardTitle>
                  <CardDescription className="text-gray-600">
                    Sua loja foi criada com sucesso! Agora você pode começar a cadastrar produtos e
                    criar sua primeira vitrine para exibir seus produtos de forma personalizada.
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex justify-end px-6 pb-6">
                  <Button
                    className="bg-[#3451e6] hover:bg-[#3451e6]/90 w-full"
                    onClick={() => {
                      setShowModal(false);
                      setActiveConfetti(false);
                    }}
                  >
                    Começar a cadastrar produtos
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {activeConfetti && <ConfettiStore />}
        </div>
      )}
    </>
  );
}
