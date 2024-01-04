import { HeaderComponent } from "./Header";
import { BackButton
 } from "./Back-Button";
import {
Card,
CardFooter,
CardHeader
}
from "@/components/ui/card"

export const ErrorCard = ()=>{
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <HeaderComponent label="Opss!, algo de errado"/>
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="voltar para login" />
      </CardFooter>
    </Card>
  )
}

