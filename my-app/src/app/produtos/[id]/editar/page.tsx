"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

// A LINHA ABAIXO É A MAIS IMPORTANTE: EXPORT DEFAULT
export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({ title: '', price: 0 });

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct({ title: data.title, price: data.price });
        setLoading(false);
      });
  }, [params.id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch(`https://dummyjson.com/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Produto atualizado com sucesso!");
      router.push('/produtos');
    }
  };

  if (loading) return <p className="p-10 text-center">Carregando dados...</p>;

  return (
    <div className="container mx-auto py-10 px-4 max-w-lg">
      <Link href="/produtos" className="flex items-center gap-2 text-sm mb-4 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Voltar para lista
      </Link>
      
      <Card>
        <CardHeader>
          <CardTitle>Editar Produto #{params.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome do Produto</label>
              <Input 
                value={product.title} 
                onChange={(e) => setProduct({...product, title: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preço ($)</label>
              <Input 
                type="number"
                value={product.price} 
                onChange={(e) => setProduct({...product, price: Number(e.target.value)})}
                required
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Save className="w-4 h-4" /> Salvar Alterações
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}