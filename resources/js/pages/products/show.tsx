import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products view',
        href: 'products/2',
    },
];
interface Product {
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
};
// diferencia entre:
/*product: Product
{product}: {product: Product}
*/
export default function show({ products }: { products: Product }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creación de productos" />
            <div className="w-8/12 p-4 flex flex-col gap-3">
                <div className="gap-1 flex flex-col">
                    <label htmlFor='name'>Product name</label>
                    <Input type='text' id='name' placeholder='Product name' value={products.name} readOnly />
                </div>
                <div className="gap-1 flex flex-col">
                    <label htmlFor='stock'>Product stock</label>
                    <Input type='text' id='stock' placeholder='Product stock' value={products.stock} readOnly />
                </div>
                <div className="gap-1 flex flex-col">
                    <label htmlFor='price'>Product price</label>
                    <Input type='number' id='price' placeholder='Product price' value={products.price} readOnly />
                </div>
                <div className="gap-1 flex flex-col">
                    <label htmlFor='description'>Product description</label>
                    <Textarea id='description'
                        value={products.description ? products.description : ''} readOnly />
                </div>
            </div>
        </AppLayout>
    );
}
