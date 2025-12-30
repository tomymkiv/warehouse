import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Head, useForm } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products edit',
        href: 'products/edit',
    },
];
interface Product{
    id: number,
    name: string,
    description: string,
    stock: number,
    price: number,
};
// diferencia entre:
/*product: Product -> prop directa, de tipo Product
product: {product: Product} -> “El componente recibe un objeto props que tiene una propiedad product de tipo Product” (sin destructuring ({}) )
{product}: {product: Product} -> lo mismo que el 2, pero des-estructurado.
*/
export default function Edit({product}: {product: Product}) {
    // objeto para manejar los datos (data), el ingreso de datos (setData), metodos (post) y errores (errors) en un formulario
    // processing sirve para que, al ejecutar los cambios, no se envien varias solicitudes al servidor, evitando asi que este se sobrecargue cuando actualizamos o creamos un producto.
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        stock: product.stock,
        price: product.price,
    })

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault() // para que no refresque la página al tocar el boton
        // PUT: modificacion
        put(route('products.update', product.id)); // products.update es donde se actualizarán los cambios, el backend.
        // le paso el id del producto que voy a editar.
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Creación de productos" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} method='post' className='space-y-4'>
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
                            onChange={e => setData('stock', Number(e.target.value))} />
                    </div>
                    <div className="gap-3 flex flex-col">

                        {
                            errors.price && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.price}</p>
                            )
                        }
                        <Input type='number' placeholder='Product price' value={data.price}
                            onChange={e => setData('price', Number(e.target.value))} />
                    </div>
                    <div className="gap-3 flex flex-col">
                        {
                            errors.description && (
                                <p className='text-red-500 font-[500] text-sm'>{errors.description}</p>
                            )
                        }
                        <Textarea placeholder='Product description' id='description' value={data.description ? data.description : ''} onChange={e => setData('description', e.target.value)} />
                    </div>
                    <Button disabled={processing} type='submit' className='cursor-pointer transition-colors duration-300' >Update product</Button>
                </form>
            </div>
        </AppLayout>
    );
}
