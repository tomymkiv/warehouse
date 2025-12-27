import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { error } from 'console';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products create',
        href: 'products/create',
    },
];

export default function Create() {
    // objeto para manejar los datos (data), el ingreso de datos (setData), metodos (post) y errores (errors) en un formulario
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        stock: '',
        price: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault() // para que no refresque la página al crear el producto.
        post(route('products.store'));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creación de productos" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} action="" method='post' className='space-y-4'>
                    <div className="gap-3 flex flex-col">
                        {
                            errors.name && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.name}</p>
                            )
                        }
                        <Input type='text' id='name' placeholder='Product name' value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>
                    <div className="gap-3 flex flex-col">

                        {
                            errors.stock && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.stock}</p>
                            )
                        }
                        <Input type='text' id='stock' placeholder='Product stock' value={data.stock}
                            onChange={e => setData('stock', e.target.value)} />
                    </div>
                    <div className="gap-3 flex flex-col">

                        {
                            errors.price && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.price}</p>
                            )
                        }
                        <Input type='number' placeholder='Product price' value={data.price}
                            onChange={e => setData('price', e.target.value)} />
                    </div>
                    <div className="gap-3 flex flex-col">
                        {
                            errors.description && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.description}</p>
                            )
                        }
                        <Textarea placeholder='Product description' id='description' value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>
                    <Button type='submit' className='cursor-pointer transition-colors duration-300'>Create product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
