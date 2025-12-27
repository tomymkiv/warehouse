import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from "@headlessui/react";
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/products',
    },
];

export default function index({ products }: { products: Product[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="m-4">
                <Link href={'products/create'} className=""><Button className={"p-3 text-lg font-[500] bg-blue-700 hover:bg-blue-500 transition-colors duration-300 rounded-md cursor-pointer my-3"}>
                    Crear un producto
                </Button>
                </Link>
                {
                    // si existen productos, que renderice la table
                    // es un condicional simplificado, indicando únicamente lo que pasaría si la misma fuese true
                    products.length > 0 && (
                        <Table>
                            <TableCaption>Listado de productos.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-right"></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                }
            </div>
        </AppLayout>
    );
}