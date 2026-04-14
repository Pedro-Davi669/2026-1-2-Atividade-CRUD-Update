import Link from "next/link";
import { Button } from "@/components/ui/button"; // Componente que o shadcn criou
import { ShoppingBag, ArrowRight } from "lucide-react"; // Ícones opcionais

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Gerenciador de Estoque
        </h1>
        <p className="text-xl text-muted-foreground">
          Visualize, edite e gerencie seus produtos da base DummyJSON.
        </p>
        <Link href="/produtos">
          <Button>Ir para Produtos</Button>
        </Link>
        
        <div className="flex justify-center gap-4">
          <Link href="/produtos">
            <Button size="lg" className="gap-2">
              <ShoppingBag className="w-5 h-5" />
              Ver Produtos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}