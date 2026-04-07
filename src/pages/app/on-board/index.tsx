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
import { redirect } from 'react-router';
import ConfettiStore from '../components/confetti';
import Form from './form';

export default function OnBoard() {
  const [activeConfetti, setActiveConfetti] = useState(false);

  return (
    <div className={cn('absolute w-full h-full z-50 opacity-90 top-0 left-0 bg-zinc-900')}>
      <div className="mr-auto ml-auto max-w-xl mt-36">
        {!activeConfetti ? (
          <Card className="">
            <CardHeader>
              <CardTitle className="text-VWhite text-3xl">Crie sua Loja</CardTitle>
              <CardDescription className="text-VWhite">
                Em poucos passos, você terá seu catálogo digital pronto para exibir produtos e
                vitrines de forma personalizada. Crie sua primeira loja para começar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form activeConfetti={setActiveConfetti} />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Parabéns 🎉 </CardTitle>
              <CardDescription>
                Sua loja foi criada com sucesso! Agora você pode começar a cadastrar produtos e
                criar sua primeira vitrine para exibir seus produtos de forma personalizada.
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-end">
              <Button
                className="bg-[#DD6E42] hover:bg-[#DD6E42]/90 w-full"
                onClick={() => {
                  redirect('/dashboard');
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
  );
}
