import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Edit, Package, ArrowLeft } from "lucide-react";

// Definição da interface para o TypeScript
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

// Função para buscar os dados no servidor (Server Component)
async function getProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=12', {
    cache: 'no-store' // Garante dados frescos
  });
  if (!res.ok) throw new Error('Falha ao carregar produtos');
  const data = await res.json();
  return data.products as Product[];
}

export default async function ProdutosPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Cabeçalho com botão para voltar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Inventário</h1>
        </div>
        <div className="text-sm text-muted-foreground">
          {products.length} produtos encontrados
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-slate-100">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-xs font-medium text-blue-600 uppercase mb-1">
                {product.category}
              </p>
              <CardTitle className="text-lg line-clamp-1">
                {product.title}
              </CardTitle>
              <p className="text-2xl font-bold mt-2">
                ${product.price}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              {/* LINK PARA A PÁGINA DE EDIÇÃO */}
              <Link href={`/produtos/${product.id}/editar`} className="w-full">
                <Button variant="outline" className="w-full gap-2">
                  <Edit className="w-4 h-4" />
                  Editar Produto
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}