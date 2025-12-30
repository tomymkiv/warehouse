import Pagination from "@/components/pagination";
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
import { Head, Link, router, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';

export interface Product {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
}

// lo que conforma a un link
export interface PaginationLink {
    url: string | null,
    label: string,
    active: boolean,
}

export interface Paginated<T> {
    data: T[], // informacion de <Product> (la 'T' es un parámetro de tipo, por lo que puede traer data de tipo Product, User o el tipo que sea)
    links: PaginationLink[], // información referida a los links (un array de la interfaz PaginationLink)
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Productos',
        href: '/products',
    },
];

export default function index({ products }: { products: Paginated<Product> }) {
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            destroy(route('products.destroy', id))
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Productos" />
            <div className="m-4">
                <Link href={'products/create'} className="">
                    <Button className={"p-3 text-lg font-[500] bg-blue-700 hover:bg-blue-500 transition-colors duration-300 rounded-md cursor-pointer my-3"}>
                        Crear un producto
                    </Button>
                </Link>
                {
                    // si existen productos, que renderice la table
                    // es un condicional simplificado, indicando únicamente lo que pasaría si la misma fuese true
                    products.data.length > 0 && (
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
                                {products.data.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-right flex justify-end gap-2">
                                            <Link href={route('products.edit', product.id)} className="">
                                                <Button className={"p-3 text-sm font-[500] hover:bg-yellow-400 bg-yellow-500 transition-colors duration-300 rounded-md cursor-pointer my-3"}>
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Link href={route('products.show', product.id)} className="">
                                                <Button className={"p-3 text-sm font-[500] hover:bg-slate-400 bg-slate-500 transition-colors duration-300 rounded-md cursor-pointer my-3"}>
                                                    Ver
                                                </Button>
                                            </Link>
                                            <Button disabled={processing} onClick={() => handleDelete(product.id)} className={"p-3 text-sm font-[500] hover:bg-red-400 bg-red-500 transition-colors duration-300 rounded-md cursor-pointer my-3"}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                }
                <Pagination links={products.links} />
            </div>
        </AppLayout>
    );
}